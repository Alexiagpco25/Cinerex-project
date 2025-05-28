"use client";

import { ChangeEvent, FormEvent } from "react";
import { Funcion, Pelicula, Sala } from "../../entities";
import { Input, Button } from "@heroui/react";

interface FuncionFormProps {
  form: Omit<Funcion, "id" | "pelicula" | "sala">; 
  peliculas: Pelicula[];
  salas: Sala[];
  editando: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  cancelarEdicion: () => void;
}

export default function FuncionForm({
  form,
  peliculas,
  salas,
  editando,
  handleChange,
  handleSubmit,
  cancelarEdicion,
}: FuncionFormProps) {
  return (
    <div className="md:w-1/3 w-full">
      <h1 className="text-2xl font-semibold mb-4">
        {editando ? "Editar Función" : "Crear nueva función"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          name="peliculaId"
          value={form.peliculaId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Selecciona una película</option>
          {peliculas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.titulo}
            </option>
          ))}
        </select>

        <select
          name="salaId"
          value={form.salaId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Selecciona una sala</option>
          {salas.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre}
            </option>
          ))}
        </select>

        <Input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
        />

        <Input
          type="time"
          name="hora"
          value={form.hora}
          onChange={handleChange}
          required
        />

        <div className="flex gap-4 mt-2">
          <Button color="primary" type="submit">
            {editando ? "Guardar cambios" : "Crear función"}
          </Button>
          {editando && (
            <Button color="secondary" onClick={cancelarEdicion}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

