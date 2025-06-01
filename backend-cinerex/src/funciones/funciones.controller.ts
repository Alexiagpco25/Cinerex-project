import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuncionesService } from './funciones.service';
import { CreateFuncionDto } from './dto/create-funcion.dto';
import { UpdateFuncionDto } from './dto/update-funcion.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Funciones')
@Controller('funciones')
export class FuncionesController {
  constructor(private readonly funcionesService: FuncionesService) {}

  @Auth('admin')
  @Post()
  create(@Body() dto: CreateFuncionDto) {
    return this.funcionesService.create(dto);
  }

  @Get()
  findAll() {
    return this.funcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionesService.findOne(id);
  }

  @Auth('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFuncionDto) {
    return this.funcionesService.update(id, dto);
  }

  @Auth('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionesService.remove(id);
  }
}
