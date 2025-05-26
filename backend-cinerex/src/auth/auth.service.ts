import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admins/entities/admin.entity';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: LoginAdminDto) {
    const existe = await this.adminRepo.findOne({
      where: { email: dto.email },
    });

    if (existe) throw new BadRequestException('El admin ya existe');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const admin = this.adminRepo.create({
      email: dto.email,
      password: hashedPassword,
    });

    await this.adminRepo.save(admin);
    return { mensaje: 'Admin registrado correctamente' };
  }

  async login(dto: LoginAdminDto) {
    const admin = await this.adminRepo.findOne({
      where: { email: dto.email },
    });

    if (!admin) throw new UnauthorizedException('Credenciales inválidas');

    const contraseñaValida = await bcrypt.compare(dto.password, admin.password);

    if (!contraseñaValida) throw new UnauthorizedException('Credenciales inválidas');

    const payload = {
      sub: admin.id,
      email: admin.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      admin: { id: admin.id, email: admin.email },
    };
  }

  async updateAdmin(email: string, updateData: Partial<LoginAdminDto>) {
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) {
      throw new BadRequestException('Admin no encontrado');
    }

    if (updateData.email) admin.email = updateData.email;

    if (updateData.password) {
      admin.password = await bcrypt.hash(updateData.password, 10);
    }

    await this.adminRepo.save(admin);
    return { mensaje: 'Admin actualizado correctamente', admin };
  }
}

