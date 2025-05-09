import { Link } from "react-router-dom"
import { Edit, Trash2 } from "lucide-react"
import ReminderAlert from "./ReminderAlert"
import { CategoryBadge } from "./ui-components"

export default function EventCard({ event, onDelete, onToggleReminder }) {
  const { id, titulo, descripcion, fechaInicio, fechaFin, categoria, recordatorio } = event

  return (
    <div
      className={`border rounded-lg p-4 mb-4 shadow-sm cursor-pointer ${
        recordatorio?.notificado ? "bg-gray-100" : "bg-white"
      }`}
      onDoubleClick={() => onToggleReminder(id)}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{titulo}</h3>
        <CategoryBadge category={categoria} />
      </div>

      <p className="text-sm text-gray-700 mb-2">{descripcion}</p>

      <p className="text-xs text-gray-500">
        {new Date(fechaInicio).toLocaleString()} - {new Date(fechaFin).toLocaleString()}
      </p>

      <div className="mt-3 flex justify-end space-x-2">
        <Link
          to={`/editar/${id}`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Editar evento"
        >
          <Edit size={18} />
        </Link>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700 transition-colors"
          aria-label="Eliminar evento"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <ReminderAlert event={event} />
    </div>
  )
}
