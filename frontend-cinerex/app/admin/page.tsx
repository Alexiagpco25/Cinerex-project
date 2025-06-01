"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UpdateProfile from "./update";
import { API_URL } from "@/app/constants";

export default function AdminPage() {
  const [profile, setProfile] = useState<any[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`${API_URL}/admins`, {
        credentials: "include",
      });
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      if (!data || !Array.isArray(data)) {
        router.push("/login");
        return;
      }
      setProfile(data);
    }
    fetchProfile();
  }, [router]);

  if (!profile) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white p-10 rounded-xl shadow-sm w-full max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Panel de Administración</h1>
      <p className="text-gray-600 mb-6">
        Bienvenid@ al panel. Aquí se puede gestionar todo el sistema de cines.
      </p>
      <UpdateProfile />
    </div>
  );
}
