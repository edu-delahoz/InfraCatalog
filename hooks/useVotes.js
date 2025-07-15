import { useEffect, useState } from 'react'

export default function useVotes() {
  const [votes, setVotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/votes')
      .then(r => r.json())
      .then(d => {
        setVotes(d)
        setLoading(false)
      })
  }, [])

  const vote = async (id, choice) => {
    const votedKey = `voted_${id}`
    if (localStorage.getItem(votedKey)) return // ya votó
    const res = await fetch(`/api/votes?id=${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ choice }),
    })
    const updated = await res.json()
    setVotes(votes.map(v => (v.id === id ? updated : v)))
    localStorage.setItem(votedKey, choice)
  }

  return { votes, loading, vote }
}
