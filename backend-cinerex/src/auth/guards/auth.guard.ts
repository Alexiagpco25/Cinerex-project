import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWT_KEY } from "../constants/jwt.constants";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
  const req = context.switchToHttp().getRequest<Request>();

  const token = this.extractTokenFromRequest(req);

  if (!token) {
    throw new UnauthorizedException("Token no encontrado");
  }

  try {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: JWT_KEY,
    });
    req["user"] = payload;
  } catch (error) {
    throw new UnauthorizedException("Token inválido");
  }

  return true;
}


  private extractTokenFromRequest(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const [type, token] = authHeader.split(" ");
      if (type === "Bearer") return token;
    }

    if (request.cookies && request.cookies.auth_token) {
      return request.cookies.auth_token;
    }
    return undefined;
  }
}
