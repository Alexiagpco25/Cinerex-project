"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="h-[10vh] bg-gray-800 shadow-md px-10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src="/Logo.svg"
          width={40}
          height={40}
          alt="Cinerex Logo"
          draggable={false}
        />
        <span className="text-xl font-semibold text-white"><b>Cinerex</b></span>
      </div>
    </header>
  );
}
