import { useState, useEffect } from 'react'
import '../app/globals.css'


export default function Testimonials() {
  const [items] = useState([
    { name: 'Ana Pérez', text: 'Gracias a esta plataforma pude opinar y mis tokens me dieron acceso a una charla local.' },
    { name: 'Carlos Gómez', text: 'Muy transparente: veo los avances en la blockchain y confío en los datos.' },
    { name: 'Luisa Martínez', text: 'La sección de governance me dejó votar y decidir presupuesto.' },
  ])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const iv = setInterval(
      () => setCurrent((c) => (c + 1) % items.length),
      5000
    )
    return () => clearInterval(iv)
  }, [items.length])

  return (
    <section className="py-12 bg-blue-50">
      <h2 className="text-3xl font-bold text-center mb-6">Voces Ciudadanas</h2>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow text-center">
        <p className="italic mb-4">“{items[current].text}”</p>
        <span className="font-semibold">— {items[current].name}</span>
      </div>
    </section>
  )
}
