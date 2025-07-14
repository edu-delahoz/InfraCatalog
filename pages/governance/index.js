import { FaBalanceScaleLeft, FaVoteYea, FaInfoCircle } from 'react-icons/fa'

export default function GovernancePage() {
  const votes = [
    {
      id: 1,
      title: '¿Aprueba la extensión del Parque Metropolitano Verde?',
      status: 'Abierta',
      fechaLimite: '15 de julio de 2025',
    },
    {
      id: 2,
      title: 'Asignación de presupuesto para mejoramiento vial sector sur',
      status: 'Cerrada',
      fechaLimite: '05 de julio de 2025',
    },  
  ]

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {votes.map((vote) => (
            <div
              key={vote.id}
              className="bg-white rounded-lg p-5 shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{vote.title}</h3>
              <p className="text-sm text-gray-600">Fecha límite: {vote.fechaLimite}</p>
              <span
                className={`inline-block mt-3 px-3 py-1 text-xs rounded-full font-medium ${
                  vote.status === 'Abierta'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {vote.status}
              </span>
              {vote.status === 'Abierta' && (
                <button className="mt-4 block w-full text-sm bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  Votar ahora
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
