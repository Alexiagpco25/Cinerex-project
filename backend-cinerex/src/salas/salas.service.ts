import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from './entities/sala.entity';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private readonly salaRepo: Repository<Sala>,
  ) {}

  async create(dto: CreateSalaDto) {
    const sala = this.salaRepo.create(dto);
    return this.salaRepo.save(sala);
  }

  findAll() {
    return this.salaRepo.find();
  }

  async findOne(id: string) {
    const sala = await this.salaRepo.findOne({ where: { id } });
    if (!sala) throw new NotFoundException('Sala no encontrada');
    return sala;
  }

  async update(id: string, dto: UpdateSalaDto) {
    const sala = await this.findOne(id);
    Object.assign(sala, dto);
    return this.salaRepo.save(sala);
  }

  async remove(id: string) {
    const result = await this.salaRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Sala no encontrada');
  }
}
