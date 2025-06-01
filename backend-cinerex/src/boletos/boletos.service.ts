import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boleto } from './entities/boleto.entity';
import { Funcion } from '../funciones/entities/funcion.entity';
import { CreateBoletoDto } from './dto/create-boleto.dto';

@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto)
    private readonly boletosRepository: Repository<Boleto>,
    @InjectRepository(Funcion)
    private readonly funcionRepository: Repository<Funcion>,
  ) {}

  async create(dto: CreateBoletoDto) {
    const funcion = await this.funcionRepository.findOne({
      where: { id: dto.funcionId },
      relations: ['boletos', 'sala'],
    });

    if (!funcion) {
      throw new NotFoundException('Función no encontrada');
    }

    const boletosVendidos = funcion.boletos.length;
    const boletosDisponibles = funcion.sala.capacidad - boletosVendidos;

    if (dto.cantidad > boletosDisponibles) {
      throw new BadRequestException('No hay suficientes boletos disponibles');
    }

    const nuevosBoletos: Boleto[] = [];
    for (let i = 0; i < dto.cantidad; i++) {
      const boleto = this.boletosRepository.create({ funcion });
      nuevosBoletos.push(boleto);
    }

    await this.boletosRepository.save(nuevosBoletos);

    return { message: `${dto.cantidad} boletos comprados exitosamente` };
  }
  
  findAll() {
    return this.boletosRepository.find({ relations: ['funcion'] });
  }

  findOne(id: string) {
    return this.boletosRepository.findOne({ where: { id }, relations: ['funcion'] });
  }

  async update(id: string, dto: any) {
    await this.boletosRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.boletosRepository.delete(id);
    return { message: `Boleto con id ${id} eliminado` };
  }
}
