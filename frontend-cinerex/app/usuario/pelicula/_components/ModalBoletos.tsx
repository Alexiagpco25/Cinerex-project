"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { IoClose, IoCheckmarkCircleOutline } from "react-icons/io5";

interface Props {
  capacidadMaxima: number;
  funcionId: string;
  fechaHora: string;
  abierto: boolean;
  onCerrar: () => void;
  onCompraExitosa: () => void;
}

export default function ModalBoletos({
  capacidadMaxima,
  funcionId,
  fechaHora,
  abierto,
  onCerrar,
  onCompraExitosa,
}: Props) {
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    if (!abierto) {
      setCantidad(1);
      setMensaje("");
      setLoading(false);
      setExito(false);
    }
  }, [abierto]);

  const comprar = async () => {
    if (cantidad < 1 || cantidad > capacidadMaxima) {
      setMensaje(`Cantidad debe ser entre 1 y ${capacidadMaxima}`);
      return;
    }

    setLoading(true);
    setMensaje("");

    setTimeout(() => {
      setLoading(false);
      setExito(true);
      setMensaje(`¡Compra exitosa de ${cantidad} boletos para ${fechaHora}!`);
      onCompraExitosa();
    }, 1500);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-sm w-full relative shadow-lg">
        <button
          onClick={onCerrar}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 dark:hover:text-white"
          aria-label="Cerrar modal"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">Comprar boletos</h2>
        <p className="mb-3 font-semibold">Función: {fechaHora}</p>

        <label htmlFor="cantidad" className="block mb-1 font-medium">
          Cantidad de boletos (máximo {capacidadMaxima}):
        </label>
        <input
          id="cantidad"
          type="number"
          min={1}
          max={capacidadMaxima}
          value={cantidad}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 1 && val <= capacidadMaxima) {
              setCantidad(val);
              setMensaje("");
            } else {
              setMensaje(`Debe ser entre 1 y ${capacidadMaxima}`);
            }
          }}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />

        {mensaje && (
          <p
            className={`mb-4 flex items-center gap-2 ${
              exito ? "text-green-600" : "text-red-600"
            }`}
          >
            {exito ? (
              <IoCheckmarkCircleOutline size={20} />
            ) : (
              <IoClose size={20} />
            )}
            {mensaje}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="shadow" onClick={onCerrar} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={comprar} disabled={loading}>
            {loading ? "Procesando..." : "Confirmar compra"}
          </Button>
        </div>
      </div>
    </div>
  );
}
