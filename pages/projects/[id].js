import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import "../../app/globals.css"
import ProjectDetailSkeleton from '@/components/skeletons/ProjectDetailSkeleton'
import ImageGalleryModal from '@/components/ImageGalleryModal'
import Comments from '@/components/Comments'

export default function ProjectDetail() {
    const router = useRouter()
    const { id } = router.query

    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showGallery, setShowGallery] = useState(false)


    useEffect(() => {
        if (id) {
            fetch('/api/projects')
                .then((res) => res.json())
                .then((data) => {
                    const found = data.find((p) => p.id === id)
                    setProject(found || null)
                    setLoading(false)
                })
        }
    }, [id])

    if (loading) return <ProjectDetailSkeleton />
    if (!project) return <p className="p-8 text-red-600">Proyecto no encontrado.</p>

    return (
        <div className="min-h-screen bg-white p-6 sm:p-12">
            {/* Botón volver */}
            <button
                className="mb-6 text-blue-600 hover:underline text-sm cursor-pointer"
                onClick={() => router.back()}
            >
                ← Volver
            </button>

            {/* Título */}
            <h1 className="text-3xl font-extrabold mb-2">{project.title}</h1>
            <p className="text-gray-600 mb-2">
                <strong>Ubicación:</strong> {project.location}
            </p>
            <p className="text-gray-600 mb-4">
                <strong>Categoría:</strong> {project.category}
            </p>

            {/* Estado */}
            <span
                className={`inline-block mb-6 px-3 py-1 rounded-full text-sm font-medium ${project.status === 'En ejecución'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'Planeado'
                        ? 'bg-yellow-100 text-yellow-800'
                        : project.status === 'Retrasado'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-600'
                    }`}
            >
                {project.status || 'Sin estado'}
            </span>

            {/* Mapa */}
            <section className="mb-10">
                <h2 className="text-xl font-bold mb-3 text-gray-800">Ubicación en el mapa</h2>
                <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        title={`Mapa de ${project.location}`}
                        src={getGoogleMapsEmbedURL(project.location)}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>

            {project.images && project.images.length > 0 && (
                <button
                    onClick={() => setShowGallery(true)}
                    className="mb-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                >
                    Ver imágenes del proyecto
                </button>
            )}
            {/* Cronología */}
            <section>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Cronología del Proyecto</h2>
                {project.updates?.length > 0 ? (
                    <ul className="border-l-4 border-blue-500 pl-4 space-y-4">
                        {project.updates.map((update, index) => (
                            <li key={index} className="relative">
                                <div className="absolute left-[-9px] top-[6px] w-3 h-3 rounded-full bg-blue-500"></div>
                                <div className="ml-2">
                                    <p className="text-sm font-semibold text-blue-700">{update.date}</p>
                                    <p className="text-gray-700">{update.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Este proyecto aún no tiene actualizaciones.</p>
                )}
                <Comments projectId={id} />
                <ImageGalleryModal open={showGallery} setOpen={setShowGallery} images={project.images} />
            </section>
        </div>

    )
}

// Función para generar la URL del mapa
function getGoogleMapsEmbedURL(location) {
    const query = encodeURIComponent(location)
    return `https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}
