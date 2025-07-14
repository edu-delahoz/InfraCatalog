import Link from 'next/link'
import '../app/globals.css'


export default function ProjectGrid({ projects }) {
  return (
    <section id="projects" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(p => (
          <Link key={p.id} href={`/projects/${p.id}`} className="block bg-gray-50 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <div className="h-40 bg-gray-200">
                <img
                  src={p.image || '/placeholder.jpg'}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
                <p className="text-gray-500 mb-2">{p.location}</p>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded ${
                    p.status === 'En ejecución'
                      ? 'bg-green-100 text-green-800'
                      : p.status === 'Planeado'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {p.status}
                </span>
              </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
