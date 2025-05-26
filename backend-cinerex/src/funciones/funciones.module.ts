import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcion } from './entities/funcion.entity';
import { Pelicula } from '../peliculas/entities/pelicula.entity'; 
import { Sala } from '../salas/entities/sala.entity'; 
import { FuncionesService } from './funciones.service';
import { FuncionesController } from './funciones.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Funcion, Pelicula, Sala]),  
  ],
  providers: [FuncionesService],
  controllers: [FuncionesController],
})
export class FuncionesModule {}

