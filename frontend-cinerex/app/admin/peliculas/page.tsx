"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Pelicula } from "../../entities";
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Textarea,
} from "@heroui/react";

export default function PeliculasPage() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState<string | null>(null);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    duracion: "",
    imagenUrl: "",
    clasificacion: "",
  });

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    cargarPeliculas();
  }, []);

  async function cargarPeliculas() {
    try {
      const res = await axios.get<Pelicula[]>(`${API_URL}/peliculas`);
      setPeliculas(res.data);
    } catch {
      alert("Error cargando películas");
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !form.titulo ||
      !form.descripcion ||
      Number(form.duracion) <= 0 ||
      !form.imagenUrl ||
      !form.clasificacion
    ) {
      return alert("Por favor completa todos los campos correctamente");
    }

    try {
      if (editando && idEditando) {
        await axios.patch(`${API_URL}/peliculas/${idEditando}`, {
          titulo: form.titulo,
          descripcion: form.descripcion,
          duracion: Number(form.duracion),
          imagenUrl: form.imagenUrl,
          clasificacion: form.clasificacion,
        });
      } else {
        await axios.post(`${API_URL}/peliculas`, {
          titulo: form.titulo,
          descripcion: form.descripcion,
          duracion: Number(form.duracion),
          imagenUrl: form.imagenUrl,
          clasificacion: form.clasificacion,
        });
      }
      cargarPeliculas();
      cancelarEdicion();
    } catch {
      alert("Error guardando película");
    }
  }

  function cancelarEdicion() {
    setEditando(false);
    setIdEditando(null);
    setForm({
      titulo: "",
      descripcion: "",
      duracion: "",
      imagenUrl: "",
      clasificacion: "",
    });
  }

  function editarPelicula(pelicula: Pelicula) {
    setEditando(true);
    setIdEditando(pelicula.id);
    setForm({
      titulo: pelicula.titulo,
      descripcion: pelicula.descripcion,
      duracion: pelicula.duracion.toString(),
      imagenUrl: pelicula.imagenUrl,
      clasificacion: pelicula.clasificacion,
    });
  }

  async function eliminarPelicula(id: string) {
    try {
      await axios.delete(`${API_URL}/peliculas/${id}`);
      cargarPeliculas();
    } catch {
      alert("Error eliminando película");
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 w-full">
          <h1 className="text-2xl font-semibold mb-4">
            {editando ? "Editar Película" : "Agregar película nueva"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Título"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
            />
            <Textarea
              label="Descripción"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
              rows={4}
            />
            <Input
              label="Duración (minutos)"
              name="duracion"
              type="number"
              min={1}
              value={form.duracion}
              onChange={handleChange}
              required
            />
            <Input
              label="Nombre de archivo de imagen (ej: avatar.jpg)"
              name="imagenUrl"
              value={form.imagenUrl}
              onChange={handleChange}
              required
            />
            <Input
              label="Clasificación (ej: A, B, C)"
              name="clasificacion"
              value={form.clasificacion}
              onChange={handleChange}
              required
            />

            <div className="flex gap-4 mt-2">
              <Button color="primary" type="submit">
                {editando ? "Guardar cambios" : "Crear película"}
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
          <h2 className="text-2xl font-semibold mb-4">Películas existentes</h2>
          {peliculas.length === 0 ? (
            <p>No hay películas registradas.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {peliculas.map((pelicula) => (
                <Card key={pelicula.id}>
                  <CardHeader>
                    <strong>{pelicula.titulo}</strong>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex gap-4 items-center">
                    <img
                      src={`${API_URL}/${pelicula.imagenUrl}`}
                      alt={pelicula.titulo}
                      className="w-20 h-28 object-cover rounded"
                    />

                    <div className="flex-grow">
                      <p>{pelicula.descripcion}</p>
                      <p>
                        Duración: {pelicula.duracion} min | Clasificación:{" "}
                        {pelicula.clasificacion}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="flat"
                        color="secondary"
                        onClick={() => editarPelicula(pelicula)}
                        aria-label={`Editar ${pelicula.titulo}`}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="flat"
                        color="danger"
                        onClick={() => eliminarPelicula(pelicula.id)}
                        aria-label={`Eliminar ${pelicula.titulo}`}
                      >
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
