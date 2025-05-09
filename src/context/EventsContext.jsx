import { createContext, useContext, useReducer, useEffect } from "react"
import { v4 as uuid } from "uuid" // Para generar identificadores únicos
import useLocalStorage from "../hooks/useLocalStorage" 

// Crea un nuevo contexto para compartir los eventos
const EventsContext = createContext()

// Función reductora (reducer) que define cómo cambiará el estado según cada acción
const reducer = (state, action) => {
  switch (action.type) {
    // Agrega un nuevo evento con un ID único
    case "ADD_EVENT":
      return [...state, { id: uuid(), ...action.payload }]

    // Actualiza un evento existente buscando por ID
    case "UPDATE_EVENT":
      return state.map((event) =>
        event.id === action.payload.id ? action.payload : event
      )

    // Elimina un evento del estado por su ID
    case "DELETE_EVENT":
      return state.filter((event) => event.id !== action.payload)

    // Marca el evento como ya notificado (para evitar notificaciones repetidas)
    case "TOGGLE_REMINDER":
      return state.map((event) =>
        event.id === action.payload
          ? {
              ...event,
              recordatorio: {
                ...event.recordatorio,
                notificado: true,
              },
            }
          : event
      )

    // Por defecto, no cambia nada
    default:
      return state
  }
}

// Proveedor del contexto que envuelve la aplicación
export const EventsProvider = ({ children }) => {
  // Obtiene y sincroniza los eventos con localStorage
  const [storedEvents, setStoredEvents] = useLocalStorage("events", [])

  // Crea el estado con useReducer, inicializado con los eventos del almacenamiento local
  const [events, dispatch] = useReducer(reducer, storedEvents)

  // Actualiza el localStorage cada vez que los eventos cambian
  useEffect(() => {
    setStoredEvents(events)
  }, [events, setStoredEvents])

  // Proporciona los eventos y la función dispatch a los componentes hijos
  return (
    <EventsContext.Provider value={{ events, dispatch }}>
      {children}
    </EventsContext.Provider>
  )
}

// Hook personalizado para usar fácilmente el contexto de eventos
export const useEvents = () => useContext(EventsContext)
