import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

export const Auth = (...roles: string[]) => {
  return applyDecorators(
    Roles(...(roles.length ? roles : ['admin'])),
    UseGuards(AuthGuard, RolesGuard),
  );
};
