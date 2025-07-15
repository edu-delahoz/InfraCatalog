import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import RegionModal from '@/components/RegionModal'
import { useRouter } from 'next/router'


export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [showRegionModal, setShowRegionModal] = useState(false)
  const [region, setRegion] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login') 
    }
  }, [status, router])
  useEffect(() => {
    if (session?.user) {
      if (session.user.region) {
        setRegion(session.user.region)
      } else {
        setShowRegionModal(true)
      }
    }
  }, [session])

  if (status === 'loading') return <p className="p-6">Cargando perfil...</p>
  if (!session) return <p className="p-6 text-red-600">No autenticado.</p>

  const usuario = {
    nombre: session.user.name,
    correo: session.user.email,
    region: region,
    tokens: 120,
    votosEmitidos: 5,
    comentarios: 8,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-12">
      {/* MODAL si no hay región */}
      <RegionModal
        open={showRegionModal}
        onSelect={(newRegion) => {
          setRegion(newRegion)
          setShowRegionModal(false)
        }}
      />

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Consulta tu actividad cívica, tus tokens y contribuciones</p>
      </div>

      {/* Card de perfil */}
      <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={session.user.image || '/default-avatar.png'}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{usuario.nombre}</h2>
            <p className="text-gray-500 text-sm">{usuario.correo}</p>
            <p className="text-gray-500 text-sm">Región: {usuario.region || 'No asignada'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <h3 className="text-xl font-bold">{usuario.tokens}</h3>
            <p className="text-gray-600 text-sm">Tokens Cívicos</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <h3 className="text-xl font-bold">{usuario.votosEmitidos}</h3>
            <p className="text-gray-600 text-sm">Votos Emitidos</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <h3 className="text-xl font-bold">{usuario.comentarios}</h3>
            <p className="text-gray-600 text-sm">Comentarios</p>
          </div>
        </div>
      </div>
    </div>
  )
}
