"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardBody, Input, Button } from "@heroui/react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function ComprarBoletosPage() {
  const searchParams = useSearchParams();
  const funcionId = searchParams.get("funcionId");
  const peliculaId = searchParams.get("peliculaId");

  const [funcion, setFuncion] = useState<any>(null);
  const [pelicula, setPelicula] = useState<any>(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDatos() {
      if (!funcionId || !peliculaId) return;

      try {
        const [funcionRes, peliculaRes] = await Promise.all([
          fetch(`http://localhost:3000/funciones/${funcionId}`),
          fetch(`http://localhost:3000/peliculas/${peliculaId}`),
        ]);

        if (funcionRes.ok) setFuncion(await funcionRes.json());
        if (peliculaRes.ok) setPelicula(await peliculaRes.json());
      } catch {
        // ignoramos errores
      } finally {
        setLoading(false);
      }
    }
    fetchDatos();
  }, [funcionId, peliculaId]);

  if (!funcionId || !peliculaId) return <p>Faltan datos necesarios.</p>;
  if (loading) return <p>Cargando...</p>;
  if (!funcion || !pelicula) return <p>Error cargando la información.</p>;

  const boletosDisponibles = funcion.sala.capacidad - funcion.boletosVendidos;

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (val > boletosDisponibles) val = boletosDisponibles;
    if (val < 1) val = 1;
    setCantidad(val);
  };

  const handleCompra = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cantidad < 1 || cantidad > boletosDisponibles) {
      setMensajeError("Cantidad inválida");
      setMensaje(null);
      return;
    }

    const res = await fetch("http://localhost:3000/boletos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ funcionId, cantidad }),
    });

    if (res.ok) {
      setMensaje(`Boletos comprados exitosamente: ${cantidad}`);
      setMensajeError(null);
      setFuncion({
        ...funcion,
        boletosVendidos: funcion.boletosVendidos + cantidad,
      });
      setCantidad(1);
      setTimeout(() => setMensaje(null), 3000);
    } else {
      setMensajeError("Error al comprar boletos");
      setMensaje(null);
      setTimeout(() => setMensajeError(null), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Comprar boletos</h2>
        </CardHeader>
        <CardBody>
          <p><strong>Película:</strong> {pelicula.titulo}</p>
          <p><strong>Fecha:</strong> {funcion.fecha}</p>
          <p><strong>Hora:</strong> {funcion.hora}</p>
          <p><strong>Boletos disponibles:</strong> {boletosDisponibles}</p>

          {boletosDisponibles === 0 ? (
            <p className="text-red-600 font-semibold mt-4">No hay boletos disponibles.</p>
          ) : (
            <form onSubmit={handleCompra} className="mt-4 space-y-4">
              <label className="block">
                <span className="text-sm font-medium">Cantidad de boletos</span>
                <Input
                  type="number"
                  min={1}
                  max={boletosDisponibles}
                  value={cantidad.toString()}
                  onChange={handleCantidadChange}
                />
              </label>
              <Button
                type="submit"
                className="w-full"
                disabled={cantidad < 1 || cantidad > boletosDisponibles}
              >
                Comprar
              </Button>

              {mensaje && (
                <div className="mt-2 flex items-center gap-2 bg-green-100 text-green-800 rounded-md px-4 py-2 shadow-md">
                  <FaCheckCircle size={20} />
                  <span className="font-semibold">{mensaje}</span>
                </div>
              )}
              {mensajeError && (
                <div className="mt-2 flex items-center gap-2 bg-red-100 text-red-800 rounded-md px-4 py-2 shadow-md">
                  <FaExclamationTriangle size={20} />
                  <span className="font-semibold">{mensajeError}</span>
                </div>
              )}
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

