"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import ModalDescripcion from "./ModalDescripcion";
import {
  FiInfo,
  FiShoppingCart,
  FiClock,
  FiFilm,
  FiStar,
} from "react-icons/fi";

export default function PeliculaCard({ pelicula }: { pelicula: any }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const getClasificacionBadge = (clasificacion: string) => {
    switch (clasificacion?.toUpperCase()) {
      case "A":
        return "bg-green-100 text-green-800";
      case "B":
        return "bg-yellow-100 text-yellow-800";
      case "C":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Card className="w-full max-w-xs shadow-lg rounded-xl overflow-hidden mx-auto transition hover:scale-[1.02] duration-200">
        <CardHeader className="p-0">
          <img
            src={`http://localhost:3000/${pelicula.imagenUrl}`}
            alt={pelicula.titulo}
            className="h-64 w-full object-cover"
          />
        </CardHeader>

        <CardBody className="flex flex-col items-center text-center px-6 pb-6">
          <h2 className="text-xl font-semibold mb-2">{pelicula.titulo}</h2>

          <div className="text-sm text-muted-foreground flex flex-col items-center gap-1 mb-3">
            <span className="flex items-center gap-1">
              <FiClock /> {pelicula.duracion} min
            </span>
            <span className="flex items-center gap-1">
              <FiStar />
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getClasificacionBadge(
                  pelicula.clasificacion
                )}`}
              >
                Clasificación: {pelicula.clasificacion}
              </span>
            </span>
          </div>

          <div className="mt-4 flex gap-4 justify-center w-full">
            <Button
              variant="bordered"
              onClick={() => setOpen(true)}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <FiInfo /> Ver más
            </Button>

            <Button
              variant="solid"
              onClick={() => router.push(`/usuario/pelicula/${pelicula.id}`)}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <FiShoppingCart /> Comprar
            </Button>
          </div>
        </CardBody>
      </Card>

      <ModalDescripcion open={open} setOpen={setOpen} pelicula={pelicula} />
    </>
  );
}
