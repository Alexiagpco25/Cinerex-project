import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Sala } from 'src/salas/entities/sala.entity';
import { Boleto } from 'src/boletos/entities/boleto.entity';
import { Pelicula } from 'src/peliculas/entities/pelicula.entity';

@Entity()
export class Funcion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fechaHora: Date;

  @ManyToOne(() => Sala, sala => sala.funciones)
  sala: Sala;

  @ManyToOne(() => Pelicula, pelicula => pelicula.funciones)
  pelicula: Pelicula;

  @OneToMany(() => Boleto, boleto => boleto.funcion)
  boletos: Boleto[];
}

