import Stripe from 'https://esm.sh/stripe@14'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-06-20',
})

const PLANOS = {
  publicar_projeto: {
    name: 'Publicar Projeto — Synk',
    amount: 2900, // €29.00
    currency: 'eur',
  },
}

Deno.serve(async (req) => {
  // CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  try {
    const { plano, empresa_id, projeto_id, success_url, cancel_url } = await req.json()

    const config = PLANOS[plano as keyof typeof PLANOS]
    if (!config) throw new Error('Plano inválido')

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: config.currency,
            product_data: { name: config.name },
            unit_amount: config.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: success_url ?? 'https://synk.pt/dashboard',
      cancel_url: cancel_url ?? 'https://synk.pt/publicar-projeto?pagamento=cancelado',
      metadata: {
        empresa_id: empresa_id ?? '',
        projeto_id: projeto_id ?? '',
      },
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
})
