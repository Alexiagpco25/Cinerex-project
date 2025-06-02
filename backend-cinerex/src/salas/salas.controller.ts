import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SalasService } from './salas.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Salas')
@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Post()
  create(@Body() dto: CreateSalaDto) {
    return this.salasService.create(dto);
  }

  @Get()
  findAll() {
    return this.salasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSalaDto) {
    return this.salasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salasService.remove(id);
  }
}
