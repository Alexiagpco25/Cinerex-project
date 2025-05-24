import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boleto } from './entities/boleto.entity';
import { Funcion } from '../funciones/entities/funcion.entity';
import { BoletosService } from './boletos.service';
import { BoletosController } from './boletos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Boleto, Funcion])],
  controllers: [BoletosController],
  providers: [BoletosService],
})
export class BoletosModule {}
