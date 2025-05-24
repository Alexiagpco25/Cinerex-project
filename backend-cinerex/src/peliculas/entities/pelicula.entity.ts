import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Funcion } from '../../funciones/entities/funcion.entity';

@Entity()
export class Pelicula {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  duracion: number; 

  @OneToMany(() => Funcion, funcion => funcion.pelicula)
  funciones: Funcion[];
}
