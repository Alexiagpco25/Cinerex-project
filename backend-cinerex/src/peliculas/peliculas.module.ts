import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { PeliculasService } from './peliculas.service';
import { PeliculasController } from './peliculas.controller';
import { Funcion } from '../funciones/entities/funcion.entity';
import { Sala } from '../salas/entities/sala.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pelicula, Funcion, Sala])],
  controllers: [PeliculasController],
  providers: [PeliculasService],
})
export class PeliculasModule {}
