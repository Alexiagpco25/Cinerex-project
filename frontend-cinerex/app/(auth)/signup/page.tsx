'use client';

import { Input, Button } from "@heroui/react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <form
      className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-10"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-3xl font-semibold text-white mb-10 text-center">
        Crea tu cuenta en <span className="text-blue-400"><b>Cinerex</b></span>
      </h2>

      <div className="mb-6">
        <label className="block mb-2 text-gray-300 font-semibold">
          Correo electrónico
        </label>
        <Input
          type="email"
          required
          size="md"
          className="w-full bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-300 font-semibold">
          Contraseña
        </label>
        <Input
          type="password"
          required
          size="md"
          className="w-full bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="********"
        />
      </div>

      <div className="mb-8">
        <label className="block mb-2 text-gray-300 font-semibold">
          Repetir contraseña
        </label>
        <Input
          type="password"
          required
          size="md"
          className="w-full bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="********"
        />
      </div>

      <Button
        color="primary"
        type="submit"
        size="md"
        className="w-full bg-blue-400 hover:bg-gray-400 transition-colors font-semibold"
      >
        Registrarse
      </Button>

      <p className="mt-6 text-center text-gray-400">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="text-gray-400 hover:text-blue-400 underline"
        >
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
