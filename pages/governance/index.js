"use client"
import { FaBalanceScaleLeft, FaVoteYea, FaInfoCircle } from 'react-icons/fa'
import useVotes from '@/hooks/useVotes'
import VoteCard from '@/components/VoteCard'

export default function GovernancePage() {
  const { votes, loading, vote } = useVotes()



  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-12">
      {/* Título */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Gobernanza Cívica</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Participa en decisiones reales sobre proyectos públicos. Vota, comenta y gana tokens cívicos.
        </p>
      </div>

      {/* ¿Cómo funciona? */}
      <section className="mb-12">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            ¿Cómo funciona?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Cada ciudadano puede participar en decisiones relevantes de su territorio.</li>
            <li>Las votaciones se registran en la blockchain para transparencia total.</li>
            <li>Los participantes reciben tokens $CIVIC como reconocimiento.</li>
          </ul>
        </div>
      </section>

      {/* Votaciones activas */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <FaBalanceScaleLeft className="text-blue-500" />
          Votaciones
        </h2>
          {loading ? (
            <p>Cargando votaciones…</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
              {votes.map(v => (
                <VoteCard key={v.id} vote={v} onVote={(choice) => vote(v.id, choice)} className="animate-fade-in" />
              ))}
            </div>
          )}
      </section>
    </div>
  )
}
