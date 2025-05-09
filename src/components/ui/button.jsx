import React from "react"

export function Button({ asChild, className = "", children, ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
