import '../app/globals.css'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import UserMenu from './UserMenu'


export default function Layout({ children }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const pathname = router.pathname

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Proyectos' },
        { href: '/governance', label: 'Governance' },
        { href: '/profile', label: 'Perfil' },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* HEADER */}
            <header className="bg-white shadow">
                <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
                    <Link href="/" className="text-2xl font-bold">
                        InfraCatalog
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6 text-sm font-medium">
                        {navItems.map(({ href, label }) => (
                            <li key={href}>
                                <Link href={href}
                                    className={`px-3 py-1 rounded-md transition duration-300 ${pathname === href
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                                        }`}>

                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden md:block">
                        <UserMenu />
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden p-2 text-gray-700"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        {open ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        )}
                    </button>
                </nav>

                {/* Mobile Menu */}
                {open && (
                    <ul className="md:hidden bg-white border-t border-gray-200">
                        {navItems.map(({ href, label }) => (
                            <li key={href} className="border-b border-gray-200">
                                <Link
                                    href={href}
                                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50"
                                    onClick={() => setOpen(false)}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}

                        {/* Aquí agregamos UserMenu para mobile */}
                        <li className="border-t border-gray-200">
                            <UserMenu mobile={true} onClose={() => setOpen(false)} />
                        </li>
                    </ul>
                )}

            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1">{children}</main>

            {/* FLOATING FEEDBACK BUTTON */}


            {/* FOOTER */}
            <footer className="bg-white py-4 text-center text-gray-600 text-sm">
                © 2025 InfraCatalog by Eduardo De La Hoz
            </footer>
        </div>
    )
}
