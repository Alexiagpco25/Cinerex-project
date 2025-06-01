import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.svg"
          alt="Logo de Cinerex"
          width={90}
          height={0}
          className="mb-7"
          priority
        />
        <div className="mt-0">{children}</div> 
      </div>
    </div>
  );
}
