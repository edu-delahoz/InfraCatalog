'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { FaCommentDots } from 'react-icons/fa'

export default function FloatingBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hola, soy **InfraBot** 🤖. ¿Cómo puedo ayudarte con tu participación ciudadana?' }
    ])
    const [input, setInput] = useState("")
    const [showOptions, setShowOptions] = useState(true)
    const [isTyping, setIsTyping] = useState(false)
    const chatEndRef = useRef(null)

    const CHAT_HEIGHT = '26rem'
    const BODY_MAX = 'auto'
    const pathname = usePathname()
    if (pathname === '/chat') return null

    const predefinedOptions = [
        "¿Cómo participo en una votación?",
        "¿Qué son los tokens cívicos?",
        "¿Cómo puedo comentar en un proyecto?",
        "¿Dónde veo los proyectos de mi región?",
        "¿Dónde denuncio?"
    ]

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    const handleSend = async (text) => {
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
        } catch {
            setIsTyping(false)
            setMessages(prev => [...prev, { type: 'bot', text: 'Hubo un problema de conexión.' }])
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
                aria-label="Abrir Asistente InfraBot"
            >
                <FaCommentDots className="w-5 h-5" />
            </button>

            {isOpen && (
                <div
                    className="fixed bottom-24 right-6 w-80 max-w-[90vw] bg-white/95
               backdrop-blur-sm border border-gray-200 shadow-2xl
               rounded-2xl z-50 flex flex-col"
                    style={{ height: CHAT_HEIGHT }}   /* ← altura constante */
                >
                    {/* Header modernizado */}
                    <div className="flex items-center justify-between px-4 py-2 bg-blue-600 rounded-t-2xl">
                        <span className="font-semibold text-white text-sm flex items-center gap-2">
                            <FaCommentDots className="text-white/90" /> InfraBot
                        </span>
                        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                            ✕
                        </button>
                    </div>

                    {/* Mensajes: scroll interno */}
                    <div
                        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm"
                        style={{ scrollbarGutter: 'stable' }}        /* mantiene ancho */
                    >
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`prose prose-sm max-w-[80%] px-3 py-2 rounded-xl shadow
            ${m.type === 'bot'
                                        ? 'bg-blue-100 text-gray-800 self-start'
                                        : 'bg-green-100 text-gray-800 self-end ml-auto'}`}
                            >
                                <ReactMarkdown>{m.text}</ReactMarkdown>
                            </div>
                        ))}

                        {isTyping && (
                            <span className="block bg-blue-100 text-gray-600 px-3 py-2 rounded-xl w-fit animate-pulse">
                                InfraBot está escribiendo…
                            </span>
                        )}

                        {showOptions && (
                            <div className="flex flex-wrap gap-2 mt-1">
                                {predefinedOptions.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleSend(opt)}
                                        className="bg-blue-200 hover:bg-blue-300 text-xs px-3 py-1 rounded-full"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={e => { e.preventDefault(); handleSend(input) }}
                        className="flex border-t"
                    >
                        <input
                            className="flex-1 px-3 py-2 text-sm outline-none"
                            placeholder="Escribe tu mensaje…"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button className="px-4 text-blue-600 font-semibold hover:text-blue-800">Enviar</button>
                    </form>
                </div>
            )}
        </>
    )
}
