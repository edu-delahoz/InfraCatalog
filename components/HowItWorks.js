// components/HowItWorks.js
import { FaSearchLocation, FaCommentDots, FaWallet } from 'react-icons/fa'
import '../app/globals.css'

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaSearchLocation size={40} />,
      title: 'Consulta Proyectos',
    },
    {
      icon: <FaCommentDots size={40} />,
      title: 'Participa con tu voz',
    },
    {
      icon: <FaWallet size={40} />,
      title: 'Gana tokens cívicos',
    },
  ]

  return (
    <section className="py-16 bg-blue-50">
      <h2 className="text-3xl font-bold text-center mb-10">¿Cómo Funciona?</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow transition-transform transform hover:-translate-y-1 hover:shadow-lg group"
          >
            <div className="mb-4 text-blue-600 group-hover:text-blue-800 transition-colors">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
