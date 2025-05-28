"use client";

import { Card, Button } from "@heroui/react";

type ModalDescripcionProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  pelicula: {
    nombre: string;
    descripcion: string;
  };
};

export default function ModalDescripcion({ open, setOpen, pelicula }: ModalDescripcionProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setOpen(false)}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <Card className="max-w-lg w-full p-6 relative">
          <Button
            variant="bordered"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => setOpen(false)}
          >
            ×
          </Button>

          <h2 className="text-2xl font-bold mb-4">{pelicula.nombre}</h2>
          <p className="text-gray-700">{pelicula.descripcion}</p>
        </Card>
      </div>
    </>
  );
}
