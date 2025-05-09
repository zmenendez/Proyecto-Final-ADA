import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { useEvents } from "../context/EventsContext"
import { CategoryBadge } from "../components/ui-components"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Clock } from "lucide-react"
import { Link } from "react-router-dom"

export default function CalendarPage() {
  const [date, setDate] = useState(new Date())
  const { events } = useEvents()

  const filtered = events.filter((e) => new Date(e.fechaInicio).toDateString() === date.toDateString())

  // Función para marcar fechas con eventos
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const hasEvents = events.some((e) => new Date(e.fechaInicio).toDateString() === date.toDateString())

      return hasEvents ? <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-1"></div> : null
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-primary">Calendario de Eventos</h1>

      <Card className="border-0 shadow-md overflow-hidden">
        <div className="calendar-container p-4">
          <style jsx global>{`
            .react-calendar {
              width: 100%;
              border: none;
              font-family: inherit;
            }
            .react-calendar__tile--active {
              background: #7c3aed !important;
              color: white;
            }
            .react-calendar__tile--now {
              background: #f3f4f6;
            }
            .react-calendar__navigation button:enabled:hover,
            .react-calendar__navigation button:enabled:focus,
            .react-calendar__tile:enabled:hover,
            .react-calendar__tile:enabled:focus {
              background-color: #f3f4f6;
            }
            .react-calendar__month-view__days__day--weekend {
              color: #ef4444;
            }
          `}</style>
          <Calendar onChange={setDate} value={date} tileContent={tileContent} className="rounded-lg shadow-sm" />
        </div>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-lg">Eventos para {format(date, "PPP", { locale: es })}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length > 0 ? (
            <div className="divide-y">
              {filtered.map((evt) => (
                <Link to={`/editar/${evt.id}`} key={evt.id} className="block p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{evt.titulo}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <Clock size={14} />
                        <span>
                          {format(new Date(evt.fechaInicio), "p", { locale: es })} -
                          {format(new Date(evt.fechaFin), "p", { locale: es })}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{evt.descripcion}</p>
                      <div className="mt-2">
                        <CategoryBadge category={evt.categoria} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">No hay eventos programados para esta fecha.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
