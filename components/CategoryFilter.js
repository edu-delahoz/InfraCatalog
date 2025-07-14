import '../app/globals.css'


export default function CategoryFilter({ categories, selected, onSelect }) {
    return (
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onSelect(cat === selected ? '' : cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selected === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    )   
  }
  