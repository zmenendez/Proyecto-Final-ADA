import React from "react"

// Etiqueta visual de categoría
export const CategoryBadge = ({ category }) => {
  const colorMap = {
    Trabajo: "bg-blue-100 text-blue-800",
    Personal: "bg-green-100 text-green-800",
    Otros: "bg-purple-100 text-purple-800",
    default: "bg-gray-100 text-gray-800",
  }
  const colorClasses = colorMap[category] || colorMap.default

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
      {category}
    </span>
  )
}

// Componente reutilizable para envolver label + campo + mensaje de error
export const FormField = ({ label, error, children }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    {children}
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
)

// Título de página con estilo uniforme
export const PageTitle = ({ children }) => (
  <h1 className="text-2xl font-bold tracking-tight mb-6 text-primary">
    {children}
  </h1>
)
