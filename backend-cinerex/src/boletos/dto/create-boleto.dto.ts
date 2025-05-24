import { IsUUID, IsInt, Min, IsString, IsNotEmpty } from "class-validator";

export class CreateBoletoDto {
  @IsUUID()
  funcionId: string;

  @IsInt()
  @Min(1)
  asiento: number;

  @IsString()
  @IsNotEmpty()
  cliente: string;
}
