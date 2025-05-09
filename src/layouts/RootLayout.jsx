import { Outlet, Link, useLocation } from "react-router-dom"
import { EventsProvider } from "../context/EventsContext"
import { Calendar, Home, Settings as SettingsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RootLayout() {
    const location = useLocation()

    return (
        <EventsProvider>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <Link to="/" className="text-xl font-bold text-primary">
                            EventoApp
                        </Link>

                        <nav className="hidden md:flex gap-2">
                            <Button variant={location.pathname === "/" ? "default" : "ghost"} asChild size="sm">
                                <Link to="/" className="flex items-center gap-1">
                                    <Home size={16} />
                                    Inicio
                                </Link>
                            </Button>
                            <Button variant={location.pathname === "/calendario" ? "default" : "ghost"} asChild size="sm">
                                <Link to="/calendario" className="flex items-center gap-1">
                                    <Calendar size={16} />
                                    Calendario
                                </Link>
                            </Button>
                            <Button variant={location.pathname === "/configuracion" ? "default" : "ghost"} asChild size="sm">
                                <Link to="/configuracion" className="flex items-center gap-1">
                                    <SettingsIcon size={16} />
                                    Configuración
                                </Link>
                            </Button>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-6">
                    <Outlet />
                </main>

                {/* Mobile nav */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
                    <Button
                        variant="ghost"
                        asChild
                        size="sm"
                        className={location.pathname === "/" ? "text-primary" : "text-gray-500"}
                    >
                        <Link to="/" className="flex flex-col items-center">
                            <Home size={20} />
                            <span className="text-xs mt-1">Inicio</span>
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        asChild
                        size="sm"
                        className={location.pathname === "/calendario" ? "text-primary" : "text-gray-500"}
                    >
                        <Link to="/calendario" className="flex flex-col items-center">
                            <Calendar size={20} />
                            <span className="text-xs mt-1">Calendario</span>
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        asChild
                        size="sm"
                        className={location.pathname === "/configuracion" ? "text-primary" : "text-gray-500"}
                    >
                        <Link to="/configuracion" className="flex flex-col items-center">
                            <SettingsIcon size={20} />
                            <span className="text-xs mt-1">Config</span>
                        </Link>
                    </Button>
                </nav>
            </div>
        </EventsProvider>
    )
}
