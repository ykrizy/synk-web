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

// ── Email via Resend ──────────────────────────────────────────────────────────
async function enviarFatura(opts: {
  para: string
  nomeEmpresa: string
  nomeResponsavel: string
  tituloProjeto: string
  plano: string
  valor: number
  sessionId: string
  data: string
  numFatura: string
}) {
  const apiKey = Deno.env.get('RESEND_API_KEY')
  if (!apiKey) { console.warn('RESEND_API_KEY não definida — email não enviado'); return }

  const isPub = opts.plano === 'publicar_projeto'
  const comissao = isPub ? 0 : Math.round(opts.valor * 0.10 * 100) / 100
  const subtotal = isPub ? 29 : opts.valor
  const iva = Math.round(subtotal * 0.23 * 100) / 100
  const total = Math.round((subtotal + iva) * 100) / 100

  const html = `<!DOCTYPE html>
<html lang="pt">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Fatura Synk ${opts.numFatura}</title></head>
<body style="margin:0;padding:0;background:#0b0b10;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0b10;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#13131a;border-radius:16px;border:1px solid #1e1e2e;overflow:hidden;max-width:600px;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#7c5cf6,#6366f1);padding:32px 40px;">
    <table width="100%"><tr>
      <td>
        <div style="display:inline-flex;align-items:center;gap:10px;">
          <div style="width:32px;height:32px;background:rgba(255,255,255,0.2);border-radius:8px;display:flex;align-items:center;justify-content:center;">
            <span style="color:#fff;font-size:16px;">⚡</span>
          </div>
          <span style="color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.04em;">Synk</span>
        </div>
        <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px;">Marketplace de Automação B2B</p>
      </td>
      <td align="right">
        <p style="color:rgba(255,255,255,0.7);font-size:12px;margin:0;">FATURA</p>
        <p style="color:#fff;font-size:20px;font-weight:700;margin:2px 0 0;">${opts.numFatura}</p>
        <p style="color:rgba(255,255,255,0.6);font-size:12px;margin:4px 0 0;">${opts.data}</p>
      </td>
    </tr></table>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:36px 40px;">

    <p style="color:#a0a0b8;font-size:14px;margin:0 0 4px;">Faturado a</p>
    <p style="color:#fff;font-size:18px;font-weight:600;margin:0 0 2px;">${opts.nomeEmpresa}</p>
    <p style="color:#6b6b8a;font-size:13px;margin:0 0 32px;">${opts.nomeResponsavel} · ${opts.para}</p>

    <!-- Tabela de itens -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #1e1e2e;border-radius:12px;overflow:hidden;margin-bottom:24px;">
      <tr style="background:#0d0d14;">
        <td style="padding:12px 16px;color:#6b6b8a;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Descrição</td>
        <td style="padding:12px 16px;color:#6b6b8a;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;" align="right">Valor</td>
      </tr>
      <tr style="border-top:1px solid #1e1e2e;">
        <td style="padding:16px;">
          <p style="color:#e0e0f0;font-size:14px;font-weight:500;margin:0 0 4px;">
            ${isPub ? 'Publicação de Projeto — Synk' : 'Depósito em Escrow — Projeto'}
          </p>
          <p style="color:#6b6b8a;font-size:12px;margin:0;">${opts.tituloProjeto}</p>
        </td>
        <td style="padding:16px;color:#e0e0f0;font-size:14px;font-weight:600;" align="right">€${subtotal.toFixed(2)}</td>
      </tr>
      ${!isPub ? `<tr style="border-top:1px solid #1e1e2e;">
        <td style="padding:16px;">
          <p style="color:#e0e0f0;font-size:14px;font-weight:500;margin:0 0 4px;">Comissão Synk (10%)</p>
          <p style="color:#6b6b8a;font-size:12px;margin:0;">Gestão do escrow e mediação</p>
        </td>
        <td style="padding:16px;color:#e0e0f0;font-size:14px;font-weight:600;" align="right">€${comissao.toFixed(2)}</td>
      </tr>` : ''}
      <tr style="border-top:1px solid #1e1e2e;">
        <td style="padding:12px 16px;color:#6b6b8a;font-size:13px;">IVA (23%)</td>
        <td style="padding:12px 16px;color:#6b6b8a;font-size:13px;" align="right">€${iva.toFixed(2)}</td>
      </tr>
      <tr style="border-top:1px solid #1e1e2e;background:#0d0d14;">
        <td style="padding:16px;color:#fff;font-size:15px;font-weight:700;">Total pago</td>
        <td style="padding:16px;color:#7c5cf6;font-size:18px;font-weight:800;" align="right">€${total.toFixed(2)}</td>
      </tr>
    </table>

    <!-- Referência -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d14;border:1px solid #1e1e2e;border-radius:12px;padding:16px;margin-bottom:32px;">
      <tr>
        <td style="padding:0 0 8px;">
          <p style="color:#6b6b8a;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin:0;">Referência de pagamento</p>
        </td>
      </tr>
      <tr><td>
        <p style="color:#a0a0b8;font-size:12px;font-family:monospace;margin:0;word-break:break-all;">${opts.sessionId}</p>
      </td></tr>
    </table>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px;">
      <a href="https://ykrizy.github.io/synk-web/dashboard"
        style="display:inline-block;background:linear-gradient(135deg,#7c5cf6,#6366f1);color:#fff;font-size:14px;font-weight:600;padding:12px 28px;border-radius:10px;text-decoration:none;">
        Ver Dashboard →
      </a>
    </div>

    <p style="color:#3a3a4e;font-size:12px;text-align:center;margin:0;">
      Synk — Marketplace de Automação B2B · <a href="https://ykrizy.github.io/synk-web" style="color:#7c5cf6;text-decoration:none;">synk.pt</a>
      <br>Esta fatura é gerada automaticamente. Guarda-a para efeitos contabilísticos.
    </p>
  </td></tr>

</table>
</td></tr></table>
</body>
</html>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Synk Faturas <onboarding@resend.dev>',
      to: [opts.para],
      subject: `Fatura ${opts.numFatura} — Synk`,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend error:', err)
  } else {
    console.log(`📧 Fatura ${opts.numFatura} enviada para ${opts.para}`)
  }
}

function gerarNumFatura(): string {
  const ano = new Date().getFullYear()
  const rand = Math.random().toString(36).toUpperCase().slice(2, 8)
  return `SYNK-${ano}-${rand}`
}

// ── Webhook handler ───────────────────────────────────────────────────────────
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
    const numFatura = gerarNumFatura()
    const dataFatura = new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'long', year: 'numeric' })

    // Buscar dados da empresa e do projeto
    const [{ data: empresa }, { data: projeto }] = await Promise.all([
      supabase.from('empresas').select('nome, nome_responsavel, email').eq('id', empresa_id ?? '').maybeSingle(),
      supabase.from('projetos').select('titulo').eq('id', projeto_id ?? '').maybeSingle(),
    ])

    // ── Publicar projeto ──────────────────────────────────────────────────────
    if (!plano || plano === 'publicar_projeto') {
      if (!projeto_id) return ok()
      const { error } = await supabase
        .from('projetos')
        .update({ estado: 'aberto' })
        .eq('id', projeto_id)
        .eq('estado', 'pendente_pagamento')
      if (error) { console.error(error); return new Response('Erro', { status: 500 }) }

      if (empresa) {
        await enviarFatura({
          para: empresa.email,
          nomeEmpresa: empresa.nome,
          nomeResponsavel: empresa.nome_responsavel,
          tituloProjeto: projeto?.titulo ?? 'Projeto Synk',
          plano: 'publicar_projeto',
          valor: 29,
          sessionId: session.id,
          data: dataFatura,
          numFatura,
        })
      }
      console.log(`✅ Projeto ${projeto_id} publicado`)
    }

    // ── Escrow de projeto ─────────────────────────────────────────────────────
    if (plano === 'escrow_projeto') {
      if (!projeto_id || !empresa_id || !especialista_id) return ok()

      const { error: pgErr } = await supabase.from('pagamentos').insert({
        projeto_id,
        empresa_id,
        especialista_id,
        valor: Number(valor ?? 0),
        estado: 'escrow',
        stripe_session_id: session.id,
      })
      if (pgErr) { console.error(pgErr); return new Response('Erro pagamentos', { status: 500 }) }

      const { error: projErr } = await supabase
        .from('projetos')
        .update({ estado: 'em_andamento' })
        .eq('id', projeto_id)
      if (projErr) { console.error(projErr); return new Response('Erro projeto', { status: 500 }) }

      if (empresa) {
        await enviarFatura({
          para: empresa.email,
          nomeEmpresa: empresa.nome,
          nomeResponsavel: empresa.nome_responsavel,
          tituloProjeto: projeto?.titulo ?? 'Projeto Synk',
          plano: 'escrow_projeto',
          valor: Number(valor ?? 0),
          sessionId: session.id,
          data: dataFatura,
          numFatura,
        })
      }

      // Notificar especialista que escrow foi confirmado
      const { data: esp } = await supabase
        .from('especialistas').select('user_id').eq('id', especialista_id).maybeSingle()
      if (esp?.user_id) {
        await supabase.from('notificacoes').insert({
          user_id: esp.user_id,
          tipo: 'escrow_pago',
          titulo: '🔐 Pagamento em escrow!',
          mensagem: `A empresa depositou o valor do projeto "${projeto?.titulo ?? ''}" em escrow. Podes começar o trabalho.`,
          link: `/projeto/${projeto_id}`,
        })
      }

      console.log(`✅ Escrow confirmado — projeto ${projeto_id}`)
    }
  }

  return ok()
})

function ok() {
  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
