// pages/api/chat.js
import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: 'https://router.huggingface.co/v1',
  apiKey: process.env.HF_TOKEN,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { message } = req.body

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Mensaje inválido' })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-V3-0324',
      messages: [
        {
          role: 'system',
          content: `Eres InfraBot, asistente oficial de InfraCatalog (https://infra-catalog.vercel.app).

          Contexto de la plataforma:
          • InfraCatalog muestra proyectos públicos de infraestructura colombiana (puentes, vías, parques).
          • Cada proyecto tiene cronología, ubicación, galería de imágenes y sección de comentarios.
          • Los ciudadanos pueden:
            – Filtrar proyectos por categoría.
            – Leer y dejar comentarios.
            – Obtener un insight IA que resume los últimos comentarios.
          • Sección “Gobernanza Cívica”:
            – Explica cómo funciona la votación blockchain.
            – Lista votaciones abiertas/cerradas y permite votar (Sí/No).
            – Los participantes ganan tokens cívicos $CIVIC.
          • Perfil de usuario:
            – Muestra región, tokens, votos emitidos y comentarios.
          • Inicio de sesión:
            – Email/contraseña o Google.
            – Usuarios sin sesión son redirigidos a /login.
          
          Tu tarea:
          – Responde máximo en 3‑5 frases, usando markdown (**negritas**, saltos de línea).
          – Si te preguntan cómo votar, explica brevemente los pasos.
          – Puedes informar acerca de como actuar en casos de corrupcion, robos, denunciar proyectos. Explicar brevemente las rutas de atencion, cordialmente.
          – Si la pregunta no está relacionada con participación cívica o proyectos, indícalo cortésmente y sugiere volver al tema.
          Comienza`,
        },
        { role: 'user', content: message },
      ],
    })

    const reply = completion.choices?.[0]?.message?.content

    return res.status(200).json({
      reply: reply || 'Gracias por tu mensaje. ¿En qué más puedo ayudarte?',
    })
  } catch (err) {
    console.error('[IA ERROR]', err)
    return res.status(500).json({
      error: 'Hubo un error al conectarse con el asistente IA.',
    })
  }
}
