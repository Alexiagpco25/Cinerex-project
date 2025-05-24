import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Funcion } from 'src/funciones/entities/funcion.entity';

@Entity()
export class Sala {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  capacidad: number;

  @OneToMany(() => Funcion, funcion => funcion.sala)
  funciones: Funcion[];
}
