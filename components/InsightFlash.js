import { FaRobot } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'

export default function InsightFlash({ insight }) {
  if (!insight) return null

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-300 rounded-xl p-5 shadow-sm mb-8 flex items-start gap-4 animate-fade-in">
      <div className="bg-yellow-200 p-2 rounded-full shadow">
        <FaRobot className="text-yellow-800 text-xl" />
      </div>
      <div className="text-sm text-gray-800 leading-relaxed prose prose-sm max-w-none">
        <p className="text-yellow-900 font-semibold mb-2">🧠 Insight generado por IA</p>
        <ReactMarkdown>{insight}</ReactMarkdown>
      </div>
    </div>
  )
}
