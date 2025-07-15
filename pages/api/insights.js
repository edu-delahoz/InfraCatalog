export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { comments } = req.body

  if (!comments || !Array.isArray(comments)) {
    return res.status(400).json({ error: 'Comentarios inválidos' })
  }

  try {
    const prompt =
    `Eres un analista urbano colombiano. Tu tarea es analizar comentarios ciudadanos sobre un proyecto de infraestructura pública.

    Responde en formato **markdown**, estructurado así:
    
    **Tono:** (positivo, negativo o mixto)  
    **Palabras clave:** (2-3 términos comunes)  
    **Conclusión:** (una frase clara, no más de 25 palabras)
    
    Comentarios:\n` +
      comments
        .slice(-3)
        .map((c) => `– ${c.name}: ${c.text}`)
        .join('\n') +
      `\n\nResponde en una sola línea estructurada.`

    const response = await fetch(  'https://router.huggingface.co/v1/chat/completions',  
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HF_TOKEN}`, // si usas router Hugging Face
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3-0324',
        messages: [
          {
            role: 'system',
            content: 'Eres un analista cívico colombiano. Sé claro, estructurado y conciso.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 120,
      }),
    })

    const data = await response.json()
    console.log('Respuesta completa de la IA:', JSON.stringify(data, null, 2))
    const insight = data.choices?.[0]?.message?.content?.trim() || 'Sin análisis.'

    return res.status(200).json({ insight })
  } catch (err) {
    console.error('Error IA:', err)
    return res.status(500).json({ error: 'Fallo al conectar con IA' })
  }
}
