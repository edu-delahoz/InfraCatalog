import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'



export default function UserMenu({ mobile = false, onClose = () => {} }) {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    const classes = mobile
      ? 'block px-4 py-3 text-gray-700 hover:bg-gray-50'
      : 'text-sm text-blue-600 hover:text-blue-800 hover:underline hover:text-blue-700 transition-all duration-200'

    return (
      <Link href="/login" className={classes} onClick={onClose}>
          Iniciar Sesión
      </Link>
    )
  }

  if (mobile) {
    return (
      <li className="border-t border-gray-200">
        <div className="block px-4 py-3 text-gray-700">
          Hola, {session.user.name}
          <button
            onClick={() => {
              signOut()
              onClose(signOut({ redirect: false }).then(() => router.push('/'))              )
            }}
            className="block mt-2 text-red-600 hover:underline text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      </li>
    )
  }

  return (
    <div className="hidden md:flex items-center gap-3 text-sm text-gray-700">
      <span>Hola, {session.user.name}</span>
      <button
        onClick={async () => {
            await signOut({ redirect: false })
            router.push('/')
          }}
        className="text-red-600 hover:text-red-800 hover:underline transition"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
