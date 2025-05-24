import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly peliculaRepo: Repository<Pelicula>,
  ) {}

  async create(dto: CreatePeliculaDto) {
    return await this.peliculaRepo.save(dto);
  }

  async findAll() {
    return await this.peliculaRepo.find();
  }

  async findOne(id: string) {
    const pelicula = await this.peliculaRepo.findOne({ where: { id } });
    if (!pelicula) throw new NotFoundException('Película no encontrada');
    return pelicula;
  }

  async update(id: string, dto: UpdatePeliculaDto) {
    const pelicula = await this.peliculaRepo.preload({
      id,
      ...dto,
    });
    if (!pelicula) throw new NotFoundException('Película no encontrada');
    return await this.peliculaRepo.save(pelicula);
  }

  async remove(id: string) {
    return await this.peliculaRepo.delete(id);
  }
}

