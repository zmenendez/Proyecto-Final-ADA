import { BrowserRouter, Routes, Route } from "react-router-dom"
import RootLayout from "./layouts/RootLayout"
import Home from "./pages/Home"
import NewEvent from "./pages/NewEvent"
import EditEvent from "./pages/EditEvent"
import CalendarPage from "./pages/Calendar"
import Settings from "./pages/Settings"
import { EventsProvider } from "./context/EventsContext"
import ReminderScheduler from "./components/ReminderScheduler"
import { useEffect } from "react"

function App() {
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((perm) =>
        console.log("Permiso de notificaciones:", perm)
      );
    }
  }, []);

  return (
    <EventsProvider>
      <BrowserRouter>
        <ReminderScheduler />
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="nuevo" element={<NewEvent />} />
            <Route path="editar/:id" element={<EditEvent />} />
            <Route path="calendario" element={<CalendarPage />} />
            <Route path="configuracion" element={<Settings />} />
            <Route path="*" element={<div className="text-center text-red-500 mt-10">Página no encontrada</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EventsProvider>
  )
}

export default App