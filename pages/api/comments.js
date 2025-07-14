let commentsDB = {
    '1': [
      { name: 'Juan', text: 'Excelente proyecto', date: '2025-07-01' },
      { name: 'Laura', text: 'Deberían considerar un parque infantil.', date: '2025-07-02' },
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
  