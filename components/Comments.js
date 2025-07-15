import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { FaRegUserCircle, FaRobot } from 'react-icons/fa'
import InsightFlash from './InsightFlash'

export default function Comments({ projectId }) {
    const [comments, setComments] = useState([])
    const [text, setText] = useState('')
    const [insight, setInsight] = useState(null)
    const [loadingIA, setLoadingIA] = useState(false)
    const { data: session } = useSession()

    const userName = session?.user?.name

    useEffect(() => {
        fetch(`/api/comments?id=${projectId}`)
            .then(res => res.json())
            .then(setComments)
    }, [projectId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!text.trim()) return

        await fetch(`/api/comments?id=${projectId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: userName,
                text,
            }),
        })

        setText('')
        const res = await fetch(`/api/comments?id=${projectId}`)
        setComments(await res.json())
        setInsight(null) // reiniciar análisis IA si hay nuevos comentarios
    }

    const getInsight = async () => {
        setLoadingIA(true)
        try {
            const res = await fetch('/api/insights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comments }),
            })
            const data = await res.json()
            setInsight(data.insight)
        } catch (err) {
            console.error('Error al obtener el insight:', err)
        } finally {
            setLoadingIA(false)
        }
    }

    return (
        <section className="mt-12 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Comentarios</h2>
                {!insight && comments.length >= 3 && (
                    <button
                        onClick={getInsight}
                        disabled={loadingIA}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow transition"
                    >
                        <FaRobot />
                        {loadingIA ? 'Analizando...' : 'Ver análisis con IA'}
                    </button>
                )}
            </div>

            {/* Insight IA */}
            {loadingIA && (
                <div className="animate-pulse p-4 bg-gray-100 rounded-xl shadow mb-6">
                    <div className="h-4 bg-gray-300 w-3/4 mb-2 rounded"></div>
                    <div className="h-3 bg-gray-200 w-5/6 rounded"></div>
                </div>
            )}


            {/* Formulario de comentario */}
            {session ? (
                <form onSubmit={handleSubmit} className="space-y-3 mb-8">
                    <textarea
                        placeholder="Escribe tu comentario..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring focus:border-blue-400"
                        rows={3}
                    />
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Enviar comentario
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-gray-500 italic text-sm mb-8">
                    Debes <a href="/login" className="text-blue-600 underline">iniciar sesión</a> para comentar.
                </p>
            )}
            {insight && <InsightFlash insight={insight} />}

            {/* Lista de comentarios */}
            <ul className="space-y-6">
                {comments.length === 0 && (
                    <p className="text-gray-400 text-sm">No hay comentarios aún. ¡Sé el primero!</p>
                )}
                {comments.map((c, i) => (
                    <li key={i} className="flex items-start space-x-3">
                        <div className="pt-1">
                            <FaRegUserCircle className="text-2xl text-blue-500" />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg w-full shadow-sm">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-700">{c.name}</span>
                                <span className="text-xs text-gray-500">{c.date}</span>
                            </div>
                            <p className="text-gray-800 text-sm whitespace-pre-line">{c.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
