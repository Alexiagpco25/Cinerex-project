import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Res,
  UseGuards,
  Get,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Response, Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() loginDto: LoginAdminDto) {
    return this.authService.register(loginDto);
  }

  @Post("login")
  async login(
    @Body() loginDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { access_token, admin } = await this.authService.login(loginDto);

    res.cookie("auth_token", access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
    });

    return { message: "Login exitoso", admin };
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("auth_token", {
      path: "/",
    });
    return { message: "Sesión cerrada correctamente" };
  }

  @Patch(":email")
  async updateAdmin(
    @Param("email") email: string,
    @Body() updateDto: UpdateAdminDto
  ) {
    return this.authService.updateAdmin(email, updateDto);
  }
}
