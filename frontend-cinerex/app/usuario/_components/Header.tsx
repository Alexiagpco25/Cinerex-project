'use client';

import Image from "next/image";
import Link from "next/link";
import { FaUserShield } from "react-icons/fa"; 

const isAdmin = true;

export default function Header() {
  return (
    <header className="h-[10vh] bg-gray-800 shadow-md px-10 flex items-center justify-between">
      <Link href="/usuario/cartelera" className="flex items-center gap-4">
        <Image
          src="/Logo.svg"
          width={40}
          height={40}
          alt="Cinerex Logo"
          draggable={false}
        />
        <span className="text-xl font-semibold text-white">
          <b>Cinerex</b>
        </span>
      </Link>

      {isAdmin && (
        <Link
          href="/login"
          className="text-white flex items-center gap-2 hover:text-yellow-400"
          title="Panel de administrador"
        >
          <FaUserShield size={20} />
          <span className="hidden sm:inline">Admin</span>
        </Link>
      )}
    </header>
  );
}
