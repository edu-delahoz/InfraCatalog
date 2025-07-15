let commentsDB = {
    '1': [
        {
          name: 'Juan R.',
          text: 'Excelente proyecto. La conexión vial va a mejorar muchísimo la movilidad entre sectores rurales y urbanos. Espero que se respeten los tiempos de entrega.',
          date: '2025-07-01',
        },
        {
          name: 'Laura M.',
          text: 'Me parece bien la obra, pero deberían incluir un parque infantil o zona verde para la comunidad cercana. La infraestructura no debe ignorar el aspecto social.',
          date: '2025-07-02',
        },
        {
          name: 'Carlos Torres',
          text: 'Soy residente del sector. En los últimos días ha habido mucho ruido y polvo por las obras. ¿Podrían mitigar el impacto ambiental o socializar mejor con los vecinos?',
          date: '2025-07-04',
        },
        {
          name: 'María Fernanda',
          text: 'Agradezco este tipo de proyectos, pero me preocupa el presupuesto. ¿Hay alguna manera pública de hacer seguimiento a los gastos?',
          date: '2025-07-05',
        },
        {
          name: 'Andrés G.',
          text: 'Vi que el avance está un poco retrasado. ¿Dónde se puede ver el cronograma actualizado? La comunidad necesita más comunicación.',
          date: '2025-07-06',
        },
        {
          name: 'Sandra P.',
          text: 'Como madre de familia, me gustaría saber si se instalarán andenes seguros y pasos peatonales. Aún no he visto señalización clara.',
          date: '2025-07-06',
        },
      ],
    '2': [],
    '3': [],
  }
  
  export default function handler(req, res) {
    const { id } = req.query
  
    if (req.method === 'GET') {
      return res.status(200).json(commentsDB[id] || [])
    }
  
    if (req.method === 'POST') {
      const { name, text } = req.body
      if (!commentsDB[id]) commentsDB[id] = []
      commentsDB[id].push({ name, text, date: new Date().toISOString().slice(0, 10) })
      return res.status(201).json({ success: true })
    }
  
    return res.status(405).end()
  }
  