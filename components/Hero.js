import Link from 'next/link'
import "../app/globals.css"

export default function Hero() {
  return (
    <section className="relative h-[28rem] flex items-center justify-center text-center text-white">
  {/* Fondo con imagen */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/hero.jpg')" }}
  />

  {/* Overlay oscurecedor */}

  {/* Contenido */}
  <div className="relative z-10 max-w-2xl px-6">
    <div className="bg-opacity-50 p-6 rounded-lg">
      <h1 className="text-5xl font-extrabold text-shadow-lg" >
        Transparencia en Infraestructura Pública
      </h1>
      <p className="text-lg drop-shadow mb-6">
        Consulta, opina y participa en los proyectos de tu región
      </p>
      <a
        href="#projects"
        className="inline-block px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition"
      >
        Ver Proyectos
      </a>
    </div>
  </div>
</section>

  )
}
