"use client";

import { Input, Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al iniciar sesión");
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form
      className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg px-8 py-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">
        Bienvenido a{" "}
        <span className="text-blue-400">
          <b>Cinerex</b>
        </span>
      </h2>

      <div className="mb-5">
        <label
          htmlFor="userEmail"
          className="block mb-1 text-gray-300 font-semibold"
        >
          Correo electrónico
        </label>
        <Input
          id="userEmail"
          name="userEmail"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="userPassword"
          className="block mb-1 text-gray-300 font-semibold"
        >
          Contraseña
        </label>
        <Input
          id="userPassword"
          name="userPassword"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="********"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
      )}

      <Button
        color="primary"
        type="submit"
        size="md"
        className="w-full bg-blue-400 hover:bg-gray-400 transition-colors font-semibold"
      >
        Iniciar Sesión
      </Button>

      <p className="mt-5 text-center text-gray-400 text-sm">
        ¿No tienes cuenta?{" "}
        <Link
          href="/signup"
          className="text-gray-400 hover:text-blue-400 underline"
        >
          Regístrate aquí
        </Link>
      </p>
    </form>
  );
}
