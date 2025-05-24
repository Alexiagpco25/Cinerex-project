import { IsString, MinLength } from 'class-validator';

export class AdminDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
