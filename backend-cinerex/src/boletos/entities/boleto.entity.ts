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

  @Column()
  cliente: string;

  @Column()
  asiento: number;

  @CreateDateColumn()
  fechaCompra: Date;

 @ManyToOne(() => Funcion, funcion => funcion.boletos)
funcion: Funcion;

}
