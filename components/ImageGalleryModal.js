import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function ImageGalleryModal({ open, setOpen, images = [] }) {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm" />
                </Transition.Child>

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
                            <Dialog.Panel className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">
                                <Dialog.Title className="text-xl font-semibold mb-4">
                                    Imágenes del Proyecto
                                </Dialog.Title>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {images.map((url, i) => (
                                        <img
                                            key={i}
                                            src={url}
                                            alt={`Imagen ${i + 1}`}
                                            className="w-full h-64 object-cover rounded"
                                        />
                                    ))}
                                </div>

                                <div className="mt-6 text-right">
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cerrar
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
