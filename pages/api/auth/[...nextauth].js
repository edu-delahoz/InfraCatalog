import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const USERS = [
  { id: 1, name: 'Juan Rojas', email: 'juan@demo.com', password: 'juan123', region: 'Cundinamarca', tokens: 40, votos: 2, comentarios: 3 },
  { id: 2, name: 'Eduardo Jesus', email: 'eduardojesus@delahoz.co', password: '1234', region: 'Antioquia', tokens: 75, votos: 4, comentarios: 6 },
  { id: 3, name: 'Pedro Gómez', email: 'pedro@demo.com', password: 'pedro123', region: 'Caldas', tokens: 20, votos: 1, comentarios: 2 },
  { id: 4, name: 'Laura Sánchez', email: 'laura@demo.com', password: 'laura123', region: 'Boyacá', tokens: 95, votos: 6, comentarios: 9 },
  { id: 5, name: 'Usuario Demo', email: 'demo@infra.com', password: 'demo', region: 'Valle', tokens: 120, votos: 5, comentarios: 8 },
]

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        email: { label: 'Correo', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const user = USERS.find(
          u => u.email === credentials.email && u.password === credentials.password
        )
        return user || null
      },
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
  ],

  session: { strategy: 'jwt' },

  pages: { signIn: '/login' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.region = user.region
        token.tokens = user.tokens
        token.votos = user.votos
        token.comentarios = user.comentarios
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.name = token.name
      session.user.email = token.email
      session.user.region = token.region
      session.user.tokens = token.tokens
      session.user.votos = token.votos
      session.user.comentarios = token.comentarios
      return session
    },
    async redirect({ url, baseUrl }) {
        if (url === '/api/auth/signout') return baseUrl
    
        if (url === '/api/auth/callback/credentials') return `${baseUrl}/profile`
    
        if (url === '/api/auth/callback/google') return `${baseUrl}/profile`
    
        return url.startsWith(baseUrl) ? url : baseUrl
      },
  },
})
