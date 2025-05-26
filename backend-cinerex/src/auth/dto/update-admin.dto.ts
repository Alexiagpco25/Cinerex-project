import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAdminDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;
}
