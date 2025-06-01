import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Funcion } from '../../funciones/entities/funcion.entity';

@Entity()
export class Boleto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  fechaCompra: Date;

 @ManyToOne(() => Funcion, funcion => funcion.boletos)
funcion: Funcion;

}
