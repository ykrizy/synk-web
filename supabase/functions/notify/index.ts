import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')!
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'khalidshah1328@gmail.com'
const FROM_NAME = 'Synk'
const BASE_URL = 'https://ykrizy.github.io/synk-web'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  })
  const data = await res.json()
  if (!res.ok) console.error('Brevo error:', data)
  return data
}

function emailBase(content: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0e0e11; padding: 40px 20px;">
      <div style="max-width: 560px; margin: 0 auto; background: #18181c; border: 1px solid #2a2a35; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #7c5cf6, #6366f1); padding: 28px 32px;">
          <span style="font-size: 22px; font-weight: 800; color: white; letter-spacing: -0.03em;">Synk</span>
        </div>
        <div style="padding: 32px;">
          ${content}
        </div>
        <div style="padding: 20px 32px; border-top: 1px solid #2a2a35;">
          <p style="margin: 0; font-size: 12px; color: #666;">
            Recebeste este email porque tens conta na Synk.
            <a href="${BASE_URL}" style="color: #7c5cf6;">synk.pt</a>
          </p>
        </div>
      </div>
    </div>
  `
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  const { table, type, record, old_record } = await req.json()

  // ── Nova candidatura → notificar empresa ─────────────────────────────────
  if (table === 'propostas' && type === 'INSERT') {
    const { data: projeto } = await supabase
      .from('projetos')
      .select('titulo, empresa_id, empresas(email, nome, nome_responsavel)')
      .eq('id', record.projeto_id)
      .single()

    const { data: especialista } = await supabase
      .from('especialistas')
      .select('nome')
      .eq('id', record.especialista_id)
      .single()

    if (projeto && especialista) {
      const empresa = projeto.empresas as { email: string; nome: string; nome_responsavel: string }
      await sendEmail(
        empresa.email,
        `Nova candidatura — "${projeto.titulo}"`,
        emailBase(`
          <h2 style="margin: 0 0 8px; color: #fff; font-size: 20px;">Nova candidatura recebida 🎉</h2>
          <p style="color: #aaa; margin: 0 0 20px;">Olá ${empresa.nome_responsavel},</p>
          <p style="color: #ddd; line-height: 1.6; margin: 0 0 24px;">
            <strong style="color: #fff;">${especialista.nome}</strong> candidatou-se ao teu projeto
            <strong style="color: #fff;">"${projeto.titulo}"</strong>.
            Acede ao dashboard para ver a candidatura completa e responder.
          </p>
          <a href="${BASE_URL}/dashboard"
             style="display: inline-block; background: #7c5cf6; color: white; text-decoration: none;
                    padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 15px;">
            Ver candidatura →
          </a>
        `)
      )
    }
  }

  // ── Candidatura aceite ou rejeitada → notificar especialista ─────────────
  if (
    table === 'propostas' &&
    type === 'UPDATE' &&
    old_record?.estado === 'pendente' &&
    (record.estado === 'aceite' || record.estado === 'rejeitado')
  ) {
    const { data: especialista } = await supabase
      .from('especialistas')
      .select('nome, email')
      .eq('id', record.especialista_id)
      .single()

    const { data: projeto } = await supabase
      .from('projetos')
      .select('titulo')
      .eq('id', record.projeto_id)
      .single()

    if (especialista && projeto) {
      const aceite = record.estado === 'aceite'
      await sendEmail(
        especialista.email,
        aceite
          ? `✅ Candidatura aceite — "${projeto.titulo}"`
          : `A tua candidatura a "${projeto.titulo}"`,
        emailBase(`
          <h2 style="margin: 0 0 8px; color: #fff; font-size: 20px;">
            ${aceite ? '✅ Candidatura aceite!' : 'Candidatura não selecionada'}
          </h2>
          <p style="color: #aaa; margin: 0 0 20px;">Olá ${especialista.nome},</p>
          ${aceite
            ? `<p style="color: #ddd; line-height: 1.6; margin: 0 0 24px;">
                A tua candidatura ao projeto <strong style="color: #fff;">"${projeto.titulo}"</strong>
                foi <strong style="color: #10b981;">aceite</strong>!
                A empresa irá entrar em contacto contigo em breve.
               </p>
               <a href="${BASE_URL}/dashboard"
                  style="display: inline-block; background: #7c5cf6; color: white; text-decoration: none;
                         padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 15px;">
                 Ver no dashboard →
               </a>`
            : `<p style="color: #ddd; line-height: 1.6; margin: 0 0 24px;">
                A tua candidatura ao projeto <strong style="color: #fff;">"${projeto.titulo}"</strong>
                não foi selecionada desta vez. Continua a explorar outros projetos no Marketplace!
               </p>
               <a href="${BASE_URL}/marketplace"
                  style="display: inline-block; background: #7c5cf6; color: white; text-decoration: none;
                         padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 15px;">
                 Ver mais projetos →
               </a>`
          }
        `)
      )
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
