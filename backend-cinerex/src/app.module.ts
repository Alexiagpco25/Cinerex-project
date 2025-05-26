import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasModule } from './salas/salas.module';
import { FuncionesModule } from './funciones/funciones.module';
import { BoletosModule } from './boletos/boletos.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { AdminModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';

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
    AdminModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
