import PeliculaCard from './_components/PeliculaCard';

async function getPeliculas() {
  const res = await fetch('http://localhost:3000/peliculas', { cache: 'no-store' });
  if (!res.ok) throw new Error('Error al cargar películas');
  return res.json();
}

export default async function PeliculasPage() {
  const peliculas = await getPeliculas();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {peliculas.map((pelicula: any) => (
        <PeliculaCard key={pelicula.id} pelicula={pelicula} />
      ))}
    </div>
  );
}
