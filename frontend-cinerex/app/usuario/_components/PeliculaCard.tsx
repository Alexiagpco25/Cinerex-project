"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import ModalDescripcion from "./ModalDescripcion";

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
      <Card className="w-full max-w-xs shadow-md mx-auto">
        <CardHeader className="p-0">
          <img
            src={pelicula.imagenUrl}
            alt={pelicula.titulo}
            className="rounded-t-xl h-64 w-full object-cover"
          />
        </CardHeader>
        <CardBody className="flex flex-col items-center text-center px-6">
          <h2 className="text-lg font-bold mb-1">{pelicula.titulo}</h2>
          <p className="text-sm text-muted-foreground mb-3">
            🎞 {pelicula.duracion} min ·{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getClasificacionBadge(
                pelicula.clasificacion
              )}`}
            >
              Clasificación: {pelicula.clasificacion}
            </span>
          </p>

          <div className="mt-4 flex gap-4 justify-center w-full">
            <Button variant="bordered" onClick={() => setOpen(true)} className="flex-1">
              Ver más
            </Button>

            <Button
              variant="solid"
              onClick={() => router.push(`/usuario/pelicula/${pelicula.id}`)}
              className="flex-1"
            >
              Comprar
            </Button>
          </div>
        </CardBody>
      </Card>

      <ModalDescripcion open={open} setOpen={setOpen} pelicula={pelicula} />
    </>
  );
}
