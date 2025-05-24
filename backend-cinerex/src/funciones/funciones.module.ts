import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionesService } from './funciones.service';
import { FuncionesController } from './funciones.controller';
import { Funcion } from './entities/funcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Funcion])],
  providers: [FuncionesService],
  controllers: [FuncionesController],
  exports: [FuncionesService],
})
export class FuncionesModule {}
