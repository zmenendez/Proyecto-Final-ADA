import ReminderAlert from "./ReminderAlert";
import { useEvents } from "../context/EventsContext";

export default function ReminderScheduler() {
  const { events } = useEvents();

  return (
    <>
      {events
        .filter((e) => !e.recordatorio?.notificado)
        .map((e) => (
          <ReminderAlert key={e.id} event={e} />
        ))}
    </>
  );
}
