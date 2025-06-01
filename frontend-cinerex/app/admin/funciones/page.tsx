"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Funcion, Pelicula, Sala } from "../../entities";
import FuncionForm from "./_components/FuncionForm"; 
import { Card, CardHeader, CardBody, Divider, Button } from "@heroui/react";
import { LuTrash2 } from "react-icons/lu";

export default function FuncionesPage() {
  const API_URL = "http://localhost:3000";

  const [funciones, setFunciones] = useState<Funcion[]>([]);
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [editando, setEditando] = useState(false);
  const [idEditando, setIdEditando] = useState<string | null>(null);

  const [form, setForm] = useState({
    peliculaId: "",
    salaId: "",
    fecha: "",
    hora: "",
  });

  useEffect(() => {
    cargarFunciones();
    cargarPeliculas();
    cargarSalas();
  }, []);

  async function cargarFunciones() {
    try {
      const res = await axios.get<Funcion[]>(`${API_URL}/funciones`);
      setFunciones(res.data);
    } catch {
      alert("Error al cargar funciones");
    }
  }

  async function cargarPeliculas() {
    try {
      const res = await axios.get<Pelicula[]>(`${API_URL}/peliculas`);
      setPeliculas(res.data);
    } catch {
      alert("Error al cargar películas");
    }
  }

  async function cargarSalas() {
    try {
      const res = await axios.get<Sala[]>(`${API_URL}/salas`);
      setSalas(res.data);
    } catch {
      alert("Error al cargar salas");
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      peliculaId: form.peliculaId,
      salaId: form.salaId,
      fecha: form.fecha,
      hora: form.hora,
    };

    try {
      if (editando && idEditando !== null) {
        await axios.patch(`${API_URL}/funciones/${idEditando}`, data);
      } else {
        await axios.post(`${API_URL}/funciones`, data);
      }

      cargarFunciones();
      cancelarEdicion();
    } catch (error: any) {
      alert(
        "Error guardando función: " +
          (error.response?.data?.message || error.message)
      );
    }
  }

  function editarFuncion(funcion: Funcion) {
    setEditando(true);
    setIdEditando(funcion.id);
    setForm({
      peliculaId: funcion.peliculaId,
      salaId: funcion.salaId,
      fecha: funcion.fecha,
      hora: funcion.hora,
    });
  }

  function cancelarEdicion() {
    setEditando(false);
    setIdEditando(null);
    setForm({ peliculaId: "", salaId: "", fecha: "", hora: "" });
  }

  async function eliminarFuncion(id: string) {
    try {
      await axios.delete(`${API_URL}/funciones/${id}`);
      cargarFunciones();
    } catch {
      alert("Error al eliminar función");
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <FuncionForm
          form={form}
          peliculas={peliculas}
          salas={salas}
          editando={editando}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelarEdicion={cancelarEdicion}
        />

        <div className="md:w-2/3 w-full">
          <h2 className="text-2xl font-semibold mb-4">Funciones registradas</h2>
          {funciones.length === 0 ? (
            <p>No hay funciones registradas.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {funciones.map((f) => (
                <Card key={f.id}>
                  <CardHeader>
                    <strong>{f.pelicula?.titulo ?? `Película #${f.peliculaId}`}</strong>
                  </CardHeader>
                  <Divider />
                  <CardBody className="flex flex-col gap-1">
                    <p>
                      <strong>Sala:</strong> {f.sala?.nombre ?? `Sala #${f.salaId}`}
                    </p>
                    <p>
                      <strong>Fecha:</strong> {f.fecha}
                    </p>
                    <p>
                      <strong>Hora:</strong> {f.hora}
                    </p>
                    <div className="flex gap-2 mt-2 justify-end">
                      <Button
                        variant="flat"
                        color="secondary"
                        onClick={() => editarFuncion(f)}
                        size="sm"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="flat"
                        color="danger"
                        onClick={() => eliminarFuncion(f.id)}
                        size="sm"
                      >
                        <LuTrash2 size={16} />
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
