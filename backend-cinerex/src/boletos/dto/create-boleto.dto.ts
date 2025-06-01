import { IsUUID, IsInt, Min } from "class-validator";

export class CreateBoletoDto {
  @IsUUID()
  funcionId: string;

  @IsInt()
  @Min(1)
  cantidad: number;
}
