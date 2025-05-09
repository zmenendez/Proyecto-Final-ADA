import { useState } from "react"
import { useEvents } from "../context/EventsContext"

export default function CategoryFilter() {
  const { events, dispatch } = useEvents()
  const [selected, setSelected] = useState("")

  const categories = Array.from(new Set(events.map((e) => e.categoria)))

  const handleChange = (e) => {
    setSelected(e.target.value)
    dispatch({ type: "FILTER_CATEGORY", payload: e.target.value })
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Filtrar por categoría
      </label>
      <select
        className="block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        value={selected}
        onChange={handleChange}
      >
        <option value="">Todos</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
}
