import { IsString, IsDateString, IsUUID } from 'class-validator';

export class CreateFuncionDto {
  @IsUUID()
  peliculaId: string;

  @IsDateString()
  fechaHora: string;

  @IsUUID()
  salaId: string;
}
