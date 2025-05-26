import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../admins/admins.module'; 
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Admin } from '../admins/entities/admin.entity';
import { JWT_KEY, EXPIRES_IN } from './constants/jwt.constants';  

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    AdminModule,
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: EXPIRES_IN,
      },
      global: true,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

