import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res.ok) {
      router.push('/profile')
    } else {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 select-none">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

        {/* FORMULARIO TRADICIONAL */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <hr className="w-1/4 border-gray-300" />
          <span className="text-gray-500 text-sm">ó</span>
          <hr className="w-1/4 border-gray-300" />
        </div>

        {/* BOTÓN GOOGLE */}
        <button
          onClick={() => signIn('google')}
          className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 488 512"
            fill="currentColor"
          >
            <path d="M488 261.8c0-17.4-1.4-34-4-50.2H249v95.1h135.6c-5.8 31.1-23.6 57.4-50.3 75.2l81.3 63.4C454.4 407.3 488 340.4 488 261.8z" />
            <path d="M249 512c67 0 123.2-22.1 164.2-60.2l-81.3-63.4c-22.5 15.1-51.3 23.9-82.9 23.9-63.7 0-117.7-43-137-100.7H28.6v63.2C69.9 466.4 151.5 512 249 512z" />
            <path d="M112 307.6c-10-29.5-10-61.2 0-90.7V153.7H28.6C10.3 189.2 0 226.7 0 266s10.3 76.8 28.6 112.3l83.4-70.7z" />
            <path d="M249 100.1c35.2 0 66.8 12.1 91.6 35.7l68.4-68.4C370.6 27.2 313.3 0 249 0 151.5 0 69.9 45.6 28.6 115.3l83.4 70.7C131.3 143.1 185.3 100.1 249 100.1z" />
          </svg>
          Iniciar con Google
        </button>
      </div>
    </div>
  )
}
