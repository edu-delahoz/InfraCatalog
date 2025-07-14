import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState(null)

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm p-8 rounded-lg shadow space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm mb-1">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
