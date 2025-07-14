import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

const REGIONES = ["Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"]

export default function RegionModal({ open, onSelect }) {
  const [selected, setSelected] = useState('')

  const handleSave = () => {
    if (selected) onSelect(selected)
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl space-y-4">
                <Dialog.Title className="text-lg font-semibold">
                  Selecciona tu región
                </Dialog.Title>

                <select
                  className="w-full border rounded px-3 py-2"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="">-- Selecciona una región --</option>
                  {REGIONES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <div className="text-right">
                  <button
                    onClick={handleSave}
                    disabled={!selected}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    Guardar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
