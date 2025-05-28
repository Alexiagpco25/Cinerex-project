export interface Pelicula {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: number; 
  imagenUrl: string;
  clasificacion: string;
  funciones?: Funcion[]; 
}


export interface Sala {
  id: number;
  nombre: string;
  capacidad: number;
}

 export interface Funcion {
  id: string;          
  fecha: string;      
  hora: string;        
  peliculaId: string;
  salaId: string;
  pelicula?: Pelicula;
  sala?: Sala;
}



export interface Admin {
  id: number;
  email: string;
  passwordHash: string; 
}
