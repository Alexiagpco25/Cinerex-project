import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  create(createAdminDto: { username: string; password: string }) {
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }

  findAll() {
    return this.adminRepository.find();
  }

  async findOne(id: string) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin no encontrado');
    return admin;
  }

  async update(id: string, updateAdminDto: Partial<Admin>) {
    const adminToUpdate = await this.adminRepository.preload({
      id,
      ...updateAdminDto,
    });
    if (!adminToUpdate) {
      throw new NotFoundException(`Admin con id ${id} no encontrado`);
    }
    return this.adminRepository.save(adminToUpdate);
  }

  remove(id: string) {
    return this.adminRepository.delete({ id });
  }

  findByUsername(username: string) {
    return this.adminRepository.findOne({ where: { username } });
  }
}

