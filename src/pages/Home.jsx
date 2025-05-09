import { Link } from "react-router-dom"
import { useEvents } from "../context/EventsContext"
import EventList from "../components/EventList"
import CategoryFilter from "../components/CategoryFilter"

export default function Home() {
  const { events } = useEvents()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Mis Eventos</h1>
        <Link
          to="/nuevo"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          + Nuevo
        </Link>
      </div>

      <CategoryFilter />

      {events.length > 0 ? (
        <EventList events={events} />
      ) : (
        <div className="text-gray-500">No hay eventos. ¡Crea uno!</div>
      )}
    </div>
  )
}
