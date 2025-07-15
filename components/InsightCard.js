import { FaRobot, FaLightbulb } from 'react-icons/fa'

export default function InsightCard({ insight }) {
  if (!insight) return null

  const lower = insight.toLowerCase()
  const color =
    lower.includes('positivo')
      ? 'bg-green-100 text-green-800'
      : lower.includes('negativo')
      ? 'bg-red-100 text-red-800'
      : 'bg-yellow-100 text-yellow-800'

  return (
    <div className={`flex items-start p-4 rounded-xl shadow-md ${color} mt-6`}>
      <div className="mr-3 mt-1 text-xl">
        <FaLightbulb />
      </div>
      <div className="text-sm leading-relaxed">
        <p className="font-semibold mb-1">Insight generado por IA</p>
        <p>{insight}</p>
      </div>
    </div>
  )
}
