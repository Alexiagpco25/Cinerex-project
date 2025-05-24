import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boleto } from './entities/boleto.entity';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { UpdateBoletoDto } from './dto/update-boleto.dto';
import { Funcion } from '../funciones/entities/funcion.entity';

@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto)
    private readonly boletoRepo: Repository<Boleto>,

    @InjectRepository(Funcion)
    private readonly funcionRepo: Repository<Funcion>,
  ) {}

  async create(dto: CreateBoletoDto) {
    const funcion = await this.funcionRepo.findOne({ where: { id: dto.funcionId } });
    if (!funcion) throw new NotFoundException('Función no encontrada');

    const asientoOcupado = await this.boletoRepo.findOne({
      where: { funcion: { id: dto.funcionId }, asiento: dto.asiento },
    });
    if (asientoOcupado) throw new Error('Asiento ya ocupado');

    const boleto = this.boletoRepo.create({ ...dto, funcion });
    return await this.boletoRepo.save(boleto);
  }

  findAll() {
    return this.boletoRepo.find({ relations: ['funcion'] });
  }

  async findOne(id: string) {
    const boleto = await this.boletoRepo.findOne({ where: { id }, relations: ['funcion'] });
    if (!boleto) throw new NotFoundException('Boleto no encontrado');
    return boleto;
  }

  async update(id: string, dto: UpdateBoletoDto) {
    const boleto = await this.findOne(id);
    Object.assign(boleto, dto);
    if (dto.funcionId) {
      const funcion = await this.funcionRepo.findOne({ where: { id: dto.funcionId } });
      if (!funcion) throw new NotFoundException('Función no encontrada');
      boleto.funcion = funcion;
    }
    return await this.boletoRepo.save(boleto);
  }

  async remove(id: string) {
    await this.boletoRepo.delete(id);
  }
}

