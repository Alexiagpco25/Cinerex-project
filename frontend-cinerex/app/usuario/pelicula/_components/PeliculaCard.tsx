"use client";

import { Card } from "@heroui/react";
import { Button } from "@heroui/react";
import { Pelicula } from "@/app/entities";
import Link from "next/link";

interface Props {
  pelicula: Pelicula;
}

export default function PeliculaCard({ pelicula }: Props) {
  const imagenSrc = `http://localhost:3000/${pelicula.imagenUrl}`;

  return (
    <Card className="max-w-5xl mx-auto shadow-md hover:shadow-xl transition duration-300 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="w-full flex items-center justify-center rounded-md overflow-hidden border max-h-[500px]">
          <img
            src={imagenSrc}
            alt={pelicula.titulo}
            className="max-w-full max-h-[500px] object-contain"
          />
        </div>

        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-3xl font-bold mb-4">{pelicula.titulo}</h2>
            <p className="text-gray-700 text-md mb-6">{pelicula.descripcion}</p>
          </div>

          <div className="space-y-3">
            <p className="text-lg text-gray-800 font-medium">
              🎞 Duración: {pelicula.duracion} min
            </p>
            <p className="text-lg font-semibold">
              <span className="bg-blue-200 text-blue-900 px-4 py-2 rounded-full">
                Clasificación: {pelicula.clasificacion}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
