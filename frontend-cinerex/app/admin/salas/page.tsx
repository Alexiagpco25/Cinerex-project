"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Sala } from "../../entities";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@heroui/react";
import { LuTrash2 } from "react-icons/lu";

export default function SalasPage() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [form, setForm] = useState({ nombre: "", capacidad: "" });

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    cargarSalas();
  }, []);

  async function cargarSalas() {
    try {
      const res = await axios.get<Sala[]>(`${API_URL}/salas`);
      setSalas(res.data);
    } catch {
      alert("Error cargando salas");
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.nombre || Number(form.capacidad) <= 0) {
      return alert("Por favor completa los datos correctamente");
    }

    try {
      if (editando && idEditando !== null) {
        await axios.patch(`${API_URL}/salas/${idEditando}`, {
          nombre: form.nombre,
          capacidad: Number(form.capacidad),
        });
      } else {
        await axios.post(`${API_URL}/salas`, {
          nombre: form.nombre,
          capacidad: Number(form.capacidad),
        });
      }
      cargarSalas();
      cancelarEdicion();
    } catch {
      alert("Error guardando sala");
    }
  }

  function cancelarEdicion() {
    setEditando(false);
    setIdEditando(null);
    setForm({ nombre: "", capacidad: "" });
  }

  function editarSala(sala: Sala) {
    setEditando(true);
    setIdEditando(sala.id);
    setForm({ nombre: sala.nombre, capacidad: sala.capacidad.toString() });
  }

  async function eliminarSala(id: number) {
    try {
      await axios.delete(`${API_URL}/salas/${id}`);
      cargarSalas();
    } catch {
      alert("Error eliminando sala");
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 w-full">
          <h1 className="text-2xl font-semibold mb-4">
            {editando ? "Editar Sala" : "Agregar sala nueva"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Nombre de la sala"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <Input
              type="number"
              label="Capacidad"
              name="capacidad"
              value={form.capacidad}
              onChange={handleChange}
              required
              min={1}
            />

            <div className="flex gap-4 mt-2">
              <Button color="primary" type="submit">
                {editando ? "Guardar cambios" : "Crear sala"}
              </Button>
              {editando && (
                <Button
                  color="secondary"
                  type="button"
                  onClick={cancelarEdicion}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </div>

        <div className="md:w-2/3 w-full">
          <h2 className="text-2xl font-semibold mb-4">Salas existentes</h2>
          {salas.length === 0 ? (
            <p>No hay salas registradas.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {salas.map((sala) => (
                <Card key={sala.id}>
                  <CardHeader>
                    <strong>{sala.nombre}</strong>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex justify-between items-center">
                    <span>Capacidad: {sala.capacidad}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="flat"
                        color="secondary"
                        onClick={() => editarSala(sala)}
                        aria-label={`Editar ${sala.nombre}`}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="flat"
                        color="danger"
                        onClick={() => eliminarSala(sala.id)}
                        aria-label={`Eliminar ${sala.nombre}`}
                      >
                        <LuTrash2 className="mr-1" size={18} />
                        Eliminar
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
