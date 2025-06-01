import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from './entities/funcion.entity';
import { CreateFuncionDto } from './dto/create-funcion.dto';
import { UpdateFuncionDto } from './dto/update-funcion.dto';
import { Pelicula } from 'src/peliculas/entities/pelicula.entity';
import { Sala } from 'src/salas/entities/sala.entity';

@Injectable()
export class FuncionesService {
  constructor(
    @InjectRepository(Funcion)
    private readonly funcionRepo: Repository<Funcion>,

    @InjectRepository(Pelicula)
    private readonly peliculaRepo: Repository<Pelicula>,

    @InjectRepository(Sala)
    private readonly salaRepo: Repository<Sala>,
  ) {}

  async create(dto: CreateFuncionDto) {
    const pelicula = await this.peliculaRepo.findOne({ where: { id: dto.peliculaId } });
    const sala = await this.salaRepo.findOne({ where: { id: dto.salaId } });

    if (!pelicula) throw new NotFoundException('Película no encontrada');
    if (!sala) throw new NotFoundException('Sala no encontrada');

    const funcion = this.funcionRepo.create({
      pelicula,
      sala,
      fecha: dto.fecha,
      hora: dto.hora,
    });

    return this.funcionRepo.save(funcion);
  }

  async findAll() {
  const funciones = await this.funcionRepo.find({
    relations: ['sala', 'pelicula', 'boletos'],
  });

  return funciones.map(f => ({
    ...f,
    peliculaId: f.pelicula?.id, 
    boletosVendidos: f.boletos?.length ?? 0,
    boletos: undefined,
  }));
}


  async findOne(id: string) {
    const funcion = await this.funcionRepo.findOne({
      where: { id },
      relations: ['sala', 'pelicula', 'boletos'],
    });
    if (!funcion) throw new NotFoundException('Función no encontrada');

    return {
      ...funcion,
      boletosVendidos: funcion.boletos?.length ?? 0,
      boletos: undefined, 
    };
  }

  async update(id: string, dto: UpdateFuncionDto) {
    const funcion = await this.findOne(id);

    if (dto.peliculaId) {
      const pelicula = await this.peliculaRepo.findOne({ where: { id: dto.peliculaId } });
      if (!pelicula) throw new NotFoundException('Película no encontrada');
      funcion.pelicula = pelicula;
    }

    if (dto.salaId) {
      const sala = await this.salaRepo.findOne({ where: { id: dto.salaId } });
      if (!sala) throw new NotFoundException('Sala no encontrada');
      funcion.sala = sala;
    }

    if (dto.fecha) {
      funcion.fecha = dto.fecha;
    }

    if (dto.hora) {
      funcion.hora = dto.hora;
    }

    return this.funcionRepo.save(funcion);
  }

  async remove(id: string) {
    const result = await this.funcionRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Función no encontrada');
    return { message: 'Función eliminada con éxito', id };
  }
}
