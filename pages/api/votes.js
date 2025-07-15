// pages/api/votes.js
let votesDB = [
    {
      id: '1',
      title: '¿Aprueba la extensión del Parque Metropolitano Verde?',
      deadline: '2025-07-15',
      status: 'abierta',
      options: {
        yes: 0,
        no: 0,
      },
    },
    {
      id: '2',
      title: 'Asignación de presupuesto para mejoramiento vial sector sur',
      deadline: '2025-07-05',
      status: 'cerrada',
      options: {
        yes: 120,
        no: 18,
      },
    },
    {
        id: '3',
        title: 'Asignación de presupuesto para mejoramiento vial sector norte',
        deadline: '2025-07-06',
        status: 'cerrada',
        options: {
          yes: 70,
          no: 12,
        },
      },
      {
        id: '4',
        title: 'Designacion de contratista para mejoramiento de parques',
        deadline: '2025-07-06',
        status: 'cerrada',
        options: {
          yes: 200,
          no: 11,
        },
      },
  ]
  
  export default function handler(req, res) {
    const { id } = req.query
  
    if (req.method === 'GET') {
      return res.status(200).json(id ? votesDB.find(v => v.id === id) : votesDB)
    }
  
    // POST /api/votes?id=1  { choice:"yes" }
    if (req.method === 'POST') {
      const { choice } = req.body
      const vote = votesDB.find(v => v.id === id)
      if (!vote || vote.status !== 'abierta') {
        return res.status(400).json({ error: 'Votación cerrada o inexistente' })
      }
      vote.options[choice] += 1
      return res.status(200).json(vote)
    }
  
    res.status(405).end()
  }
  