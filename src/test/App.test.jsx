import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { EventsProvider } from "../context/EventsContext";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import ReminderAlert from "../components/ReminderAlert";
import CategoryFilter from "../components/CategoryFilter";
import Home from "../pages/Home";

// Pruebas para el formulario de eventos
describe("EventForm", () => {
  test("renderiza campos del formulario", () => {
    // Renderiza el componente EventForm dentro del contexto y enrutador necesario
    render(
      <EventsProvider>
        <MemoryRouter>
          <EventForm isEditing={false} />
        </MemoryRouter>
      </EventsProvider>
    );

    // Verifica que todos los campos estén presentes en el formulario
    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha Inicio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha Fin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoría/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Recordatorio/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Guardar|Actualizar/i })
    ).toBeInTheDocument();
  });
});

// Pruebas para la lista de eventos
describe("EventList", () => {
  test("renderiza correctamente los eventos listados", () => {
    // Define eventos de prueba
    const initialEvents = [
      {
        id: "1",
        titulo: "Evento 1",
        descripcion: "Desc 1",
        fechaInicio: new Date().toISOString(),
        fechaFin: new Date().toISOString(),
        categoria: "Trabajo",
        recordatorio: { minutosAntes: 10, notificado: false },
      },
      {
        id: "2",
        titulo: "Evento 2",
        descripcion: "Desc 2",
        fechaInicio: new Date().toISOString(),
        fechaFin: new Date().toISOString(),
        categoria: "Personal",
        recordatorio: { minutosAntes: 5, notificado: false },
      },
    ];

    // Renderiza el componente EventList con los eventos simulados
    render(
      <EventsProvider>
        <MemoryRouter>
          <EventList events={initialEvents} />
        </MemoryRouter>
      </EventsProvider>
    );

    // Verifica que los títulos de los eventos aparezcan en pantalla
    expect(screen.getByText("Evento 1")).toBeInTheDocument();
    expect(screen.getByText("Evento 2")).toBeInTheDocument();
  });
});

// Pruebas para el componente que maneja recordatorios
describe("ReminderAlert", () => {
  test("no lanza notificación si el evento ya fue notificado", () => {
    // Evento con recordatorio ya notificado
    const event = {
      id: "x",
      titulo: "Prueba",
      fechaInicio: new Date(Date.now() + 60000).toISOString(), // 1 min en el futuro
      recordatorio: { minutosAntes: 1, notificado: true },
    };

    // Simula que el permiso de notificaciones está concedido
    window.Notification = { permission: "granted" };

    // Espía para verificar si se llama a Notification
    const spy = vi.fn();
    window.Notification = spy;

    // Renderiza el componente ReminderAlert
    render(
      <EventsProvider>
        <ReminderAlert event={event} />
      </EventsProvider>
    );

    // Verifica que no se haya llamado a la notificación
    expect(spy).not.toHaveBeenCalled();
  });
});

// Pruebas para el filtro de categorías
describe("CategoryFilter", () => {
  test("muestra las categorías en el select", () => {
    // Simula datos guardados en localStorage
    localStorage.setItem(
      "events",
      JSON.stringify([
        { id: "1", categoria: "Trabajo" },
        { id: "2", categoria: "Personal" },
      ])
    );

    // Renderiza el filtro de categorías
    render(
      <EventsProvider>
        <MemoryRouter>
          <CategoryFilter />
        </MemoryRouter>
      </EventsProvider>
    );

    // Verifica que se muestren las opciones correspondientes en el <select>
    expect(
      screen.getByRole("option", { name: "Todos" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Trabajo" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Personal" })
    ).toBeInTheDocument();
  });
});

// Pruebas para la página principal
describe("Home", () => {
  test("muestra el título 'Mis Eventos'", () => {
    // Renderiza la página principal
    render(
      <EventsProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </EventsProvider>
    );

    // Verifica que el título principal esté presente
    expect(screen.getByText(/Mis Eventos/i)).toBeInTheDocument();
  });
});
