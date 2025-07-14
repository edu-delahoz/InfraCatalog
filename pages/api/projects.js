export default function handler(req, res) {
    const projects = [
      {
        id: '1',
        title: 'Puente Río Cauca',
        region: 'Antioquia',
        location: 'Cauca sector puente',
        status: 'En ejecución',
        category: 'Infraestructura Vial',
        updates: [
          { date: '01/07/2025', desc: 'Inicio de obra' },
          { date: '05/07/2025', desc: 'Avance 10%' },
          { date: '08/07/2025', desc: 'Retraso por lluvia' },
        ],
        images: [
            'https://res.cloudinary.com/dmofqt0gv/image/upload/v1752210249/puente2_jxdvqv.webp',
            'https://res.cloudinary.com/dmofqt0gv/image/upload/v1752210249/puente3_tli4do.jpg',
            'https://res.cloudinary.com/dmofqt0gv/image/upload/v1752210249/puente1_k8wbev.webp'
          ],
      },
      {
        id: '2',
        title: 'Vía Alterna Hidroituango',
        region: 'Caldas',
        location: 'Tramo norte Caldas Hidroituango',
        status: 'Planeado',
        category: 'Conectividad',
        updates: [
          { date: '15/06/2025', desc: 'Estudio de impacto' },
          { date: '20/06/2025', desc: 'Aprobación ambiental' },
        ],
        images: [
            'https://res.cloudinary.com/dmofqt0gv/image/upload/v1752210232/via3_y7uuqa.jpg',
            'https://res.cloudinary.com/dmofqt0gv/image/upload/v1752210232/via2_ycevqb.webp',
            'https://res.cloudinary.com/dmofqt0gv/image/upload/v1752210232/via1_gss1vr.webp'
          ],
        
        
        
      },
      {
        id: '3',
        title: 'Parque Metropolitano Verde',
        region: 'Cundinamarca',
        location: 'Zona urbana central Parque metropolitano verde cundinamarca',
        status: 'En licitación',
        category: 'Espacio Público',
        updates: [
          { date: '01/05/2025', desc: 'Diseño conceptual' },
          { date: '10/06/2025', desc: 'Licitación pública' },
        ],
        images: [
            'https://res.cloudinary.com/dmofqt0gv/image/upload/v1752210264/parqueverde1_x21knq.jpg',
            'https://res.cloudinary.com/dmofqt0gv/image/upload/v1752210263/parqueverde3_sjxvt2.jpg',
            'https://res.cloudinary.com/dmofqt0gv/image/upload/v1752210263/parqueverde2_alu4ll.jpg'
          ],
      },
      
    ]
  
    res.status(200).json(projects)
  }
  