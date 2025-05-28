import UpdateProfile from "./update";

export default function AdminPage() {
  return (
    <div className="bg-white p-10 rounded-xl shadow-sm w-full max-w-[1200px] mx-auto">
      {" "}
      <h1 className="text-2xl font-semibold mb-2">Panel de Administración</h1>
      <p className="text-gray-600 mb-6">
        Bienvenid@ al panel. Aquí se puede gestionar todo el sistema de cines.
      </p>
      <UpdateProfile />
    </div>
  );
}
