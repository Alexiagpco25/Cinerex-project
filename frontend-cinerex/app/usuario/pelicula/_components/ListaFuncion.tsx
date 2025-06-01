"use client";

import { Funcion } from "@/app/entities";
import { Button } from "@heroui/react";
import Link from "next/link";

interface Props {
  funciones: Funcion[];
  peliculaId: string; 
}

export default function ListaFuncion({ funciones, peliculaId }: Props) {
  if (!funciones || funciones.length === 0) {
    return <p className="text-gray-500 mt-4">No hay funciones disponibles.</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Funciones disponibles</h3>
      <ul className="space-y-2">
        {funciones.map((funcion) => (
          <li
            key={funcion.id}
            className="border p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                Fecha: {new Date(funcion.fecha).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Hora: {funcion.hora}</p>
              {funcion.sala && (
                <p className="text-sm text-gray-500">{funcion.sala.nombre}</p>
              )}
            </div>

            <Link
              href={`/usuario/pelicula/boletos?peliculaId=${peliculaId}&funcionId=${funcion.id}`}
            >
              <Button>Comprar</Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
