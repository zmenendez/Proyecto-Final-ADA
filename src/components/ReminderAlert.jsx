import { useEffect } from 'react';
import { useEvents } from '../context/EventsContext';

export default function ReminderAlert({ event }) {
  const { id, titulo, fechaInicio, recordatorio } = event;
  const { dispatch } = useEvents();

  useEffect(() => {
    if (!recordatorio || typeof recordatorio.notificado === "undefined") return;
    if (!recordatorio.notificado) {
      const eventMs = new Date(fechaInicio).getTime();
      const alertMs = eventMs - recordatorio.minutosAntes * 60000;
      const delay = alertMs - Date.now();
      console.log(`Tiempo restante para notificación: ${Math.floor(delay / 1000)}s`);

      if (delay > 0) {
        console.log(`⏰ Recordatorio de "${titulo}" programado para: ${new Date(Date.now() + delay).toLocaleTimeString()}`);

        const timer = setTimeout(() => {
          console.log(`Notificando evento: "${titulo}"`);

          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`Recordatorio: ${titulo}`, {
              body: `${recordatorio.minutosAntes} minutos antes`,
            });
          } else {
            alert(`Recordatorio: ${titulo} en ${recordatorio.minutosAntes} minutos`);
          }

          dispatch({ type: 'TOGGLE_REMINDER', payload: id });
        }, delay);

        return () => clearTimeout(timer);
      } else {
        console.log(`Recordatorio de "${titulo}" ya expiró o está demasiado cerca.`);
      }
    } else {
      console.log(`"${titulo}" ya fue notificado.`);
    }
  }, [event, dispatch, id, titulo, fechaInicio, recordatorio]);

  return null;
}
