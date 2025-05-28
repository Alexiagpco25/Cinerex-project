import Header from "./_components/Header";

export default function UsuarioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="p-6">{children}</main>
    </div>
  );
}
