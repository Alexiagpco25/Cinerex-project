import PeliculaCard from '../_components/PeliculaCard';

async function getPeliculas() {
  const res = await fetch('http://localhost:3000/peliculas', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Error al obtener películas');
  }
  const data = await res.json();
  return data;
}

export default async function CarteleraPage() {
  const peliculas = await getPeliculas();

  if (!Array.isArray(peliculas)) {
    return <div>No se encontraron películas.</div>;
  }

  return (
    <div className="px-4 py-8">
      <div className="flex justify-center mb-10">
        <h1 className="text-3xl font-bold px-6 py-2 bg-indigo-200 text-indigo-900 rounded-lg transition-colors duration-300 hover:bg-indigo-100 hover:text-indigo-700">
          Cartelera
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {peliculas.map((pelicula) => (
          <PeliculaCard key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
    </div>
  );
}


