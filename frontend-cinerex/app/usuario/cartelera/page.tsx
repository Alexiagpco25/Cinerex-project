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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {peliculas.map((pelicula) => (
        <PeliculaCard key={pelicula.id} pelicula={pelicula} />
      ))}
    </div>
  );
}

