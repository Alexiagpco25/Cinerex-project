import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { UpdateBoletoDto } from './dto/update-boleto.dto';

@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @Post()
  create(@Body() dto: CreateBoletoDto) {
    return this.boletosService.create(dto);
  }

  @Get()
  findAll() {
    return this.boletosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boletosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBoletoDto) {
    return this.boletosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boletosService.remove(id);
  }
}

