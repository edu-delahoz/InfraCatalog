import Link from 'next/link'
import "../app/globals.css"
import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import KPICards from '../components/KPICards'
import HowItWorks from '../components/HowItWorks'
import CategoryFilter from '../components/CategoryFilter'
import ProjectGrid from '../components/ProjectGrid'
import Testimonials from '../components/Testimonials'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [])

  const categories = Array.from(new Set(projects.map(p => p.category)))
  const filtered = filter
    ? projects.filter(p => p.category === filter)
    : projects

  // Ejemplo de stats; en Fase 2 las puedes obtener de API
  const stats = {
    activeProjects: projects.filter(p => p.status === 'En ejecución').length,
    comments: 350,
    tokens: 1200,
    votes: 480,
  }

  return (
    <>
      <Hero />

      <KPICards stats={stats} />

      <HowItWorks />

      <CategoryFilter
        categories={categories}
        selected={filter}
        onSelect={setFilter}
      />

      <ProjectGrid projects={filtered} />

      <Testimonials />
    </>
  )
}
