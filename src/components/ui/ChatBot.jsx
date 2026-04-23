import { useState, useRef, useEffect } from 'react'

const N8N_WEBHOOK_URL = 'https://khalidshah.app.n8n.cloud/webhook/synk-chat'

const BOT_AVATAR = (
  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
    S
  </div>
)

const TypingIndicator = () => (
  <div className="flex items-end gap-2">
    {BOT_AVATAR}
    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
)

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: 'Olá! 👋 Sou o assistente da Synk. Como posso ajudar-te hoje?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).slice(2)}`)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll ao fundo quando chegam novas mensagens
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus no input quando o chat abre
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { id: Date.now(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      const botText = data.response || data.output || data.text || 'Desculpa, não consegui obter uma resposta.'

      setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: botText }])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          role: 'bot',
          text: 'Ocorreu um erro ao contactar o assistente. Por favor tenta novamente.',
          error: true,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Janela do chat */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: '520px', border: '1px solid #e5e7eb' }}
        >
          {/* Header */}
          <div className="bg-indigo-600 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Assistente Synk</p>
              <p className="text-indigo-200 text-xs">Responde em segundos ⚡</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Fechar chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ minHeight: 0 }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.role === 'bot' && BOT_AVATAR}
                <div
                  className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : msg.error
                      ? 'bg-red-50 text-red-700 border border-red-200 rounded-bl-sm'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escreve a tua pergunta..."
              disabled={loading}
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:opacity-50 bg-gray-50"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center flex-shrink-0 transition-colors"
              aria-label="Enviar mensagem"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        aria-label={open ? 'Fechar chat' : 'Abrir chat'}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </>
  )
}
