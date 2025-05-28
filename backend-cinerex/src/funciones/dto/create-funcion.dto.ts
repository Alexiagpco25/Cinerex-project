import { IsDateString, IsUUID, IsString } from 'class-validator';

export class CreateFuncionDto {
  @IsUUID()
  peliculaId: string;

  @IsUUID()
  salaId: string;

  @IsDateString() 
  fecha: string;

  @IsString() 
  hora: string;
}
