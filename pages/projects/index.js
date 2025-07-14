import { useEffect, useState } from 'react'
import Link from 'next/link'
import CategoryFilter from '../../components/CategoryFilter'
import ProjectCardSkeleton from '@/components/skeletons/ProjectCardSkeleton'


export default function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [filter, setFilter] = useState('')
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data)
                setLoading(false)
            })
    }, [])

    const categories = Array.from(
        new Set(projects.map((p) => p.category).filter(Boolean))
    )

    const filteredProjects = filter
        ? projects.filter((p) => p.category === filter)
        : projects


    if (loading) {
        return <ProjectCardSkeleton />
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-12">
            {/* Encabezado */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-2 text-gray-800">Proyectos en ejecución</h1>
                <p className="text-gray-600">Explora los proyectos de infraestructura pública por categoría, región y estado</p>
            </div>

            {/* Filtro de categoría */}
            <CategoryFilter
                categories={categories}
                selected={filter}
                onSelect={setFilter}
            />
            {/* Grid de proyectos */}
            {loading ? (
                <ProjectCardSkeleton count={3} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((p) => (
                        <Link key={p.id} href={`/projects/${p.id}`} className="group block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100">
                            <div className="h-32 overflow-hidden">
                                <img
                                    src={p.images && p.images.length ? p.images[0] : '/images/placeholder.png'}
                                    alt={p.title}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
                                    {p.title}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">{p.location}</p>
                                <span
                                    className={`inline-block px-2 py-1 text-xs rounded font-medium ${p.status === 'En ejecución'
                                        ? 'bg-green-100 text-green-700'
                                        : p.status === 'Planeado'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : p.status === 'Retrasado'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {p.status || 'Sin estado'}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}


        </div>
    )
}

// Íconos según categoría (puedes personalizar más)
function getIconForCategory(category) {
    switch (category) {
        case 'Infraestructura Vial':
            return '🛣️'
        case 'Conectividad':
            return '🚧'
        case 'Espacio Público':
            return '🌳'
        case 'Servicios Públicos':
            return '💡'
        default:
            return '🏗️'
    }
}
