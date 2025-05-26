"use client";

import { Input, Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Error al registrar");
        return;
      }

      setSuccessMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setError("Error al conectarse al servidor");
    }
  };

  return (
    <form
      className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-10"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-semibold text-white mb-10 text-center">
        Crea tu cuenta en{" "}
        <span className="text-blue-400">
          <b>Cinerex</b>
        </span>
      </h2>
      {error && (
        <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
      )}
      {successMessage && (
        <p className="text-green-500 mb-4 text-center font-semibold">
          {successMessage}
        </p>
      )}

      <div className="mb-6">
        <label className="block mb-2 text-gray-300 font-semibold">
          Correo electrónico
        </label>
        <Input
          type="email"
          required
          size="md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-300 font-semibold">Contraseña</label>
        <Input
          type="password"
          required
          size="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
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
        <Link href="/login" className="text-gray-400 hover:text-blue-400 underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
