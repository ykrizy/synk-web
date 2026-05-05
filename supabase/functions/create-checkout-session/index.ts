import Stripe from 'https://esm.sh/stripe@14'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-06-20',
})

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })

  try {
    const {
      plano,
      empresa_id,
      projeto_id,
      especialista_id,
      valor,        // usado no escrow — montante dinâmico em euros
      success_url,
      cancel_url,
    } = await req.json()

    let lineItem: Stripe.Checkout.SessionCreateParams.LineItem

    if (plano === 'publicar_projeto') {
      lineItem = {
        price_data: {
          currency: 'eur',
          product_data: { name: 'Publicar Projeto — Synk' },
          unit_amount: 2900, // €29
        },
        quantity: 1,
      }
    } else if (plano === 'escrow_projeto') {
      if (!valor || valor <= 0) throw new Error('Valor de escrow inválido')
      // Synk cobra 10% de comissão sobre o valor do projeto
      const comissao = Math.round(valor * 100 * 0.10)   // centavos — apenas comissão
      const total    = Math.round(valor * 100)            // centavos — valor total
      lineItem = {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Projeto em escrow — Synk`,
            description: `Valor total: €${valor.toLocaleString('pt-PT')} (inclui comissão Synk de 10%)`,
          },
          unit_amount: total,
        },
        quantity: 1,
      }
    } else {
      throw new Error('Plano inválido')
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [lineItem],
      mode: 'payment',
      success_url: success_url ?? 'https://ykrizy.github.io/synk-web/dashboard',
      cancel_url:  cancel_url  ?? 'https://ykrizy.github.io/synk-web/dashboard',
      metadata: {
        plano,
        empresa_id:      empresa_id      ?? '',
        projeto_id:      projeto_id      ?? '',
        especialista_id: especialista_id ?? '',
        valor:           String(valor ?? 0),
      },
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { 'Content-Type': 'application/json', ...CORS },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS },
    })
  }
})
