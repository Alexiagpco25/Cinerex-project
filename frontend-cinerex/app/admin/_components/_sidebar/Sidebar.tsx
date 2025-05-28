"use client";

import NavItem from "./NavItem";
import { LuUsers, LuFilm, LuCalendarClock, LuLogOut, LuVideo } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md flex flex-col px-6 py-10 justify-between">
      <div className="flex flex-col gap-6 flex-grow">
        <NavItem
          icon={<LuUsers className="text-indigo-500 text-2xl" />}
          href="/admin"
          label="Inicio"
        />
        <NavItem
          icon={<LuFilm className="text-indigo-500 text-2xl" />}
          href="/admin/salas"
          label="Salas"
        />
        <NavItem
          icon={<LuVideo className="text-indigo-600 text-2xl" />}
          href="/admin/peliculas"
          label="Películas"
        />
        <NavItem
          icon={<LuCalendarClock className="text-indigo-500 text-2xl" />}
          href="/admin/funciones"
          label="Funciones"
        />
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-black-600 hover:text-indigo-800 font-semibold px-4 py-2 rounded-md transition"
      >
        <LuLogOut className="text-2xl" />
        Cerrar sesión
      </button>
    </aside>
  );
}



