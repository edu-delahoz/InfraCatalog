import { useSession } from 'next-auth/react'

export default function VoteCard({ vote, onVote }) {
  const { data: session } = useSession()
  const votedKey = `voted_${vote.id}`
  const alreadyVoted = typeof window !== 'undefined' && localStorage.getItem(votedKey)

  return (
    <div className="bg-white rounded-xl shadow p-5 flex-1">
      <h3 className="font-semibold mb-1">{vote.title}</h3>
      <p className="text-sm text-gray-500 mb-2">Fecha límite: {vote.deadline}</p>

      {vote.status === 'abierta' ? (
        alreadyVoted ? (
          <p className="text-sm text-green-600 mb-2">¡Gracias por tu voto!</p>
        ) : session ? (
          <div className="flex gap-3">
            <button
              onClick={() => onVote('yes')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Sí
            </button>
            <button
              onClick={() => onVote('no')}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              No
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-2">
            <a href="/login" className="text-blue-600 underline">Inicia sesión</a> para votar.
          </p>
        )
      ) : (
        <span className="inline-block bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full mb-2">
          Cerrada
        </span>
      )}

      {/* Resultado */}
      <div className="mt-4 text-xs text-gray-600">
        Sí: {vote.options.yes} | No: {vote.options.no}
      </div>
    </div>
  )
}
