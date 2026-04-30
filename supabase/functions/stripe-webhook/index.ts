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
    console.error('Webhook signature verification failed:', (err as Error).message)
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const projetoId = session.metadata?.projeto_id

    if (!projetoId) {
      console.warn('checkout.session.completed sem projeto_id no metadata')
      return new Response(JSON.stringify({ received: true }), { status: 200 })
    }

    const { error } = await supabase
      .from('projetos')
      .update({ estado: 'aberto' })
      .eq('id', projetoId)
      .eq('estado', 'pendente_pagamento')

    if (error) {
      console.error('Erro ao ativar projeto:', error)
      return new Response('Erro ao ativar projeto', { status: 500 })
    }

    console.log(`✅ Projeto ${projetoId} ativado após pagamento`)
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
