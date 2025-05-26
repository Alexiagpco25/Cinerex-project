import { IsString, IsInt, Min } from 'class-validator';

export class CreatePeliculaDto {
  @IsString()
  titulo: string;

  @IsString()
  descripcion: string;

  @IsInt()
  @Min(1)
  duracion: number;

  @IsString()
  imagenUrl: string; 

  @IsString()
  clasificacion: string;
}
