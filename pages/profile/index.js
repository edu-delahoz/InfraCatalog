import { useSession } from 'next-auth/react'
import { FaUserCircle, FaCoins, FaRegCommentDots, FaVoteYea } from 'react-icons/fa'
import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton'

export default function ProfilePage() {
  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') return <ProfileSkeleton />

  const usuario = {
    nombre: session.user.name,
    correo: session.user.email,
    region: session.user.region,
    tokens: session.user.tokens,
    votosEmitidos: session.user.votos,
    comentarios: session.user.comentarios,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Consulta tu actividad cívica, tus tokens y contribuciones</p>
      </div>

      {/* Card de Perfil */}
      <div className="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <FaUserCircle className="text-5xl text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold">{usuario.nombre}</h2>
            <p className="text-gray-500 text-sm">{usuario.correo}</p>
            <p className="text-gray-500 text-sm">Región: {usuario.region}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <FaCoins className="mx-auto text-2xl text-yellow-500 mb-2" />
            <h3 className="text-xl font-bold">{usuario.tokens}</h3>
            <p className="text-gray-600 text-sm">Tokens Cívicos</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <FaVoteYea className="mx-auto text-2xl text-green-600 mb-2" />
            <h3 className="text-xl font-bold">{usuario.votosEmitidos}</h3>
            <p className="text-gray-600 text-sm">Votos Emitidos</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <FaRegCommentDots className="mx-auto text-2xl text-blue-600 mb-2" />
            <h3 className="text-xl font-bold">{usuario.comentarios}</h3>
            <p className="text-gray-600 text-sm">Comentarios</p>
          </div>
        </div>
      </div>
    </div>
  )
}
