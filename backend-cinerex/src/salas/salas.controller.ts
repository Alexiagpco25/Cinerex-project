import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SalasService } from './salas.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Salas')
@Controller('salas')
export class SalasController {
  constructor(private readonly salasService: SalasService) {}

  @Auth('admin')
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

  @Auth('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSalaDto) {
    return this.salasService.update(id, dto);
  }

  @Auth('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salasService.remove(id);
  }
}
