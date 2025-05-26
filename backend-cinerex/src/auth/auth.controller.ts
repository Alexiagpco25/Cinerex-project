import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';

const TOKEN_NAME = 'auth_token';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() loginDto: LoginAdminDto) {
    return this.authService.register(loginDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginAdminDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(loginDto);
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7);

    response.cookie(TOKEN_NAME, token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expireDate,
      maxAge: 1000 * 60 * 60 * 24 * 7, 
    });

    return { token: token.access_token, admin: token.admin };
  }

  @Patch(':email')
  async updateAdmin(
    @Param('email') email: string,
    @Body() updateDto: UpdateAdminDto,
  ) {
    return this.authService.updateAdmin(email, updateDto);
  }
}
