import { IsString, IsInt, Min } from 'class-validator';

export class CreateSalaDto {
  @IsString()
  nombre: string;

  @IsInt()
  @Min(1)
  capacidad: number;
}
