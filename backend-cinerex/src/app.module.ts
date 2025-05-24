import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasModule } from './salas/salas.module';
import { FuncionesModule } from './funciones/funciones.module';
import { BoletosModule } from './boletos/boletos.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { AdministradoresModule } from './administradores/administradores.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'alexia',
      password: 'alexia123',
      database: 'cinerex_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SalasModule,
    FuncionesModule,
    BoletosModule,
    PeliculasModule,
    AdministradoresModule,
    AdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
