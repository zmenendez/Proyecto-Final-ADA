import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"
import defaultCategories from "../data/categories"

export default function Settings() {
  const [categories, setCategories] = useState([])
  const [newCat, setNewCat] = useState("")

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("categories")) || defaultCategories
    setCategories(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories))
  }, [categories])

  const addCategory = () => {
    if (newCat.trim() && !categories.includes(newCat.trim())) {
      setCategories((prev) => [...prev, newCat.trim()])
      setNewCat("")
    }
  }

  const removeCategory = (cat) => {
    setCategories((prev) => prev.filter((c) => c !== cat))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addCategory()
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Configuración</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Nueva Categoría</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-3 py-2 border rounded-md text-sm"
            placeholder="Ej: Reunión"
          />
          <button
            onClick={addCategory}
            className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90"
          >
            Agregar
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Categorías actuales</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md"
            >
              <span>{cat}</span>
              <button
                onClick={() => removeCategory(cat)}
                className="text-red-500 hover:text-red-700"
                aria-label="Eliminar"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
