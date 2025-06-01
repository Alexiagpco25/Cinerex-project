import PeliculaCard from "../_components/PeliculaCard";
import ListaFuncion from "../_components/ListaFuncion";

async function getPelicula(id: string) {
  const res = await fetch(`http://localhost:3000/peliculas/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al cargar la película");
  return res.json();
}

export default async function PeliculaPage({
  params,
}: {
  params: { id: string };
}) {
  const pelicula = await getPelicula(params.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <PeliculaCard pelicula={pelicula} />
      <ListaFuncion funciones={pelicula.funciones} peliculaId={pelicula.id} />
    </div>
  );
}
