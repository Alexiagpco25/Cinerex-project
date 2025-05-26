import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const existe = await this.adminRepository.findOne({ where: { email: createAdminDto.email } });
    if (existe) throw new BadRequestException('El admin ya existe');

    createAdminDto.password = await bcrypt.hash(createAdminDto.password, 10);

    return this.adminRepository.save(createAdminDto);
  }

  findAll() {
    return this.adminRepository.find();
  }

  async findByEmail(email: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) throw new NotFoundException('Admin no encontrado');
    return admin;
  }

  async updateAdmin(email: string, updateAdminDto: UpdateAdminDto) {
    const adminToUpdate = await this.adminRepository.preload({
      email,
      ...updateAdminDto,
    });

    if (!adminToUpdate) throw new NotFoundException('Admin no encontrado');

    if (updateAdminDto.password) {
      adminToUpdate.password = await bcrypt.hash(updateAdminDto.password, 10);
    }

    return this.adminRepository.save(adminToUpdate);
  }

  async remove(email: string) {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) throw new NotFoundException('Admin no encontrado');
    await this.adminRepository.remove(admin);
    return { message: 'Admin eliminado correctamente' };
  }
}
