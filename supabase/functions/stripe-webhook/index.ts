import Stripe from 'https://esm.sh/stripe@14'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    )
  } catch (err) {
    console.error('Webhook signature failed:', (err as Error).message)
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { plano, projeto_id, empresa_id, especialista_id, valor } = session.metadata ?? {}

    // ── Publicar projeto ──────────────────────────────────────────────────────
    if (!plano || plano === 'publicar_projeto') {
      if (!projeto_id) return ok()
      const { error } = await supabase
        .from('projetos')
        .update({ estado: 'aberto' })
        .eq('id', projeto_id)
        .eq('estado', 'pendente_pagamento')
      if (error) { console.error(error); return new Response('Erro', { status: 500 }) }
      console.log(`✅ Projeto ${projeto_id} publicado`)
    }

    // ── Escrow de projeto ─────────────────────────────────────────────────────
    if (plano === 'escrow_projeto') {
      if (!projeto_id || !empresa_id || !especialista_id) return ok()

      // 1. Registar pagamento em escrow
      const { error: pgErr } = await supabase.from('pagamentos').insert({
        projeto_id,
        empresa_id,
        especialista_id,
        valor: Number(valor ?? 0),
        estado: 'escrow',
        stripe_session_id: session.id,
      })
      if (pgErr) { console.error(pgErr); return new Response('Erro pagamentos', { status: 500 }) }

      // 2. Projeto → em_andamento
      const { error: projErr } = await supabase
        .from('projetos')
        .update({ estado: 'em_andamento' })
        .eq('id', projeto_id)
      if (projErr) { console.error(projErr); return new Response('Erro projeto', { status: 500 }) }

      console.log(`✅ Escrow confirmado — projeto ${projeto_id} em andamento`)
    }
  }

  return ok()
})

function ok() {
  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
