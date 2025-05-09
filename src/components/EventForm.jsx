"use client"

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card"
import { FormField } from "./ui-components"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useEvents } from "../context/EventsContext"
import { useEffect } from "react"
import { Calendar, Clock, Tag, Bell } from "lucide-react"

export default function EventForm({ isEditing = false }) {
  const { id } = useParams()
  const { events, dispatch } = useEvents()
  const event = isEditing ? events.find((e) => e.id === id) : null

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: event || {
      titulo: "",
      descripcion: "",
      fechaInicio: "",
      fechaFin: "",
      categoria: "",
      minutosAntes: 15,
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (isEditing && event) {
      reset(event)
    }
  }, [event, reset, isEditing])

  const onSubmit = (data) => {
    const payload = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      fechaInicio: data.fechaInicio,
      fechaFin: data.fechaFin,
      categoria: data.categoria,
      recordatorio: {
        minutosAntes: Number.parseInt(data.minutosAntes),
        notificado: event?.recordatorio?.notificado ?? false,
      },
    }

    if (isEditing) {
      dispatch({ type: "UPDATE_EVENT", payload: { id, ...payload } })
    } else {
      dispatch({ type: "ADD_EVENT", payload })
    }

    navigate("/")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
        <CardTitle>{isEditing ? "Editar Evento" : "Crear Nuevo Evento"}</CardTitle>
      </CardHeader>
      <form id="event-form" onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="pt-6">
          <FormField label="Título" error={errors.titulo?.message}>
            <div className="relative">
              <label htmlFor="titulo" className="sr-only">Título</label>
              <Input
                id="titulo"
                className="pl-10"
                placeholder="Título del evento"
                {...register("titulo", {
                  required: "El título es obligatorio",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                })}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Calendar size={16} />
              </div>
            </div>
          </FormField>

          <FormField label="Descripción" error={errors.descripcion?.message}>
            <div className="relative">
              <label htmlFor="descripcion" className="sr-only">Descripción</label>
              <Textarea
                id="descripcion"
                className="min-h-[100px] resize-none"
                placeholder="Describe tu evento"
                {...register("descripcion", { required: "La descripción es obligatoria" })}
              />
            </div>
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Fecha Inicio" error={errors.fechaInicio?.message}>
              <div className="relative">
                <label htmlFor="fechaInicio" className="sr-only">Fecha Inicio</label>
                <Input
                  id="fechaInicio"
                  type="datetime-local"
                  className="pl-10"
                  {...register("fechaInicio", { required: "La fecha de inicio es obligatoria" })}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Clock size={16} />
                </div>
              </div>
            </FormField>

            <FormField label="Fecha Fin" error={errors.fechaFin?.message}>
              <div className="relative">
                <label htmlFor="fechaFin" className="sr-only">Fecha Fin</label>
                <Input
                  id="fechaFin"
                  type="datetime-local"
                  className="pl-10"
                  {...register("fechaFin", {
                    required: "La fecha de fin es obligatoria",
                    validate: (value) =>
                      new Date(value) > new Date(getValues("fechaInicio")) ||
                      "La fecha de fin debe ser después del inicio",
                  })}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Clock size={16} />
                </div>
              </div>
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Categoría" error={errors.categoria?.message}>
              <div className="relative">
                <label htmlFor="categoria" className="sr-only">Categoría</label>
                <select
                  id="categoria"
                  className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...register("categoria", { required: "La categoría es obligatoria" })}
                >
                  <option value="">Selecciona categoría</option>
                  <option value="Trabajo">Trabajo</option>
                  <option value="Personal">Personal</option>
                  <option value="Otros">Otros</option>
                </select>
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Tag size={16} />
                </div>
              </div>
            </FormField>

            <FormField label="Recordatorio (minutos antes)" error={errors.minutosAntes?.message}>
              <div className="relative">
                <label htmlFor="minutosAntes" className="sr-only">Recordatorio</label>
                <Input
                  id="minutosAntes"
                  type="number"
                  className="pl-10"
                  placeholder="15"
                  {...register("minutosAntes", {
                    required: "Define cuántos minutos antes",
                    min: { value: 1, message: "Debe ser al menos 1 minuto" },
                  })}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Bell size={16} />
                </div>
              </div>
            </FormField>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2 bg-gray-50 rounded-b-lg">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>Cancelar</Button>
          <Button type="submit">{isEditing ? "Actualizar" : "Guardar"}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
