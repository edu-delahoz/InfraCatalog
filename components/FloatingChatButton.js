'use client'

import "../app/globals.css"
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ReactMarkdown from 'react-markdown'


export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hola, soy **RutaSegura**. ¿En qué puedo ayudarte hoy?' }
  ])
  const [input, setInput] = useState("")
  const [showOptions, setShowOptions] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const pathname = usePathname()
  if (pathname === '/chat') return null

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const predefinedOptions = [
    "Quiero denunciar un caso",
    "Necesito ayuda psicológica",
    "Quiero apoyar a alguien"
  ]

  const handleSend = async () => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { type: 'user', text }])
    setInput("")
    setShowOptions(false)
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await res.json()
      setIsTyping(false)

      if (data.reply) {
        setMessages(prev => [...prev, { type: 'bot', text: data.reply }])
      } else {
        setMessages(prev => [...prev, { type: 'bot', text: 'Lo siento, hubo un error al procesar tu solicitud.' }])
      }
    } catch (_error) {
        setMessages(prev => [...prev, { type: 'bot', text: 'Hubo un problema de conexión.' }])
      }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir Chat"
      >
        <div
          className="fixed bottom-8 right-8 bg-[#AFD3F5] hover:bg-[#9ec6f1] text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all duration-200 z-50"
          aria-label="Abrir Chatbot"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div
        className={`fixed bottom-20 right-6 w-80 max-w-[90vw] z-50
        bg-white shadow-xl rounded-xl border border-gray-200 flex flex-col
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
        h-[25rem]  // altura total del chat
      `}
        >
          <div className="flex justify-between items-center p-3 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Asistente RutaSegura</h3>
            <svg
              onClick={() => setIsOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer"
              aria-label="Cerrar chat"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-700 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`transition duration-300 transform whitespace-pre-wrap
                  ${msg.type === 'bot' ? 'bg-blue-100 text-gray-800 self-start mr-auto' : 'bg-green-100 text-gray-800 self-end ml-auto'}
                  p-3 rounded-xl max-w-[80%] shadow-sm`}
              >
                {msg.type === 'bot' ? (
                  <ReactMarkdown >{msg.text}</ReactMarkdown>
                ) : (
                  <p>{msg.text}</p>
                )}
              </div>
            ))}
            {/* Indicador de que el bot está escribiendo */}
          {isTyping && (
            <div className="bg-blue-100 text-gray-600 text-sm px-4 py-2 rounded-xl w-fit animate-pulse">
              RutaSegura está escribiendo...
            </div>
          )}
          {/* Auto scroll target */}
          <div ref={chatEndRef} />

            {showOptions && (
              <div className="flex flex-wrap gap-2 mt-2">
                {predefinedOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(option)}
                    className="bg-blue-200 hover:bg-blue-300 text-sm text-gray-800 px-3 py-1 rounded-full transition-all duration-200 ease-in-out"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div ref={chatEndRef} />

                  
          <form
            className="flex items-center border-t"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(input)
            }}
          >
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="w-full px-3 py-2 text-sm focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="px-4 text-blue-500 font-semibold hover:text-blue-700 cursor-pointer">
              Enviar
            </button>
          </form>
        </div>
      )}
    </>
  )
}