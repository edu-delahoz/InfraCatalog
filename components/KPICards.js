// components/KPICards.js
import {
    FaProjectDiagram,
    FaComments,
    FaCoins,
    FaVoteYea,
  } from 'react-icons/fa'
  import '../app/globals.css'
  
  export default function KPICards({ stats }) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              Icon: FaProjectDiagram,
              color: 'text-blue-600',
              value: stats.activeProjects,
              label: 'Proyectos Activos',
            },
            {
              Icon: FaComments,
              color: 'text-green-600',
              value: stats.comments,
              label: 'Comentarios Recibidos',
            },
            {
              Icon: FaCoins,
              color: 'text-yellow-600',
              value: stats.tokens,
              label: 'Tokens Cívicos',
            },
            {
              Icon: FaVoteYea,
              color: 'text-red-600',
              value: stats.votes,
              label: 'Votos en Governance',
            },
          ].map(({ Icon, color, value, label }, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-lg shadow transition-shadow hover:shadow-lg text-center"
            >
              <Icon className={`mx-auto text-4xl ${color} mb-2`} />
              <h3 className="text-3xl font-bold">{value}</h3>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }
  