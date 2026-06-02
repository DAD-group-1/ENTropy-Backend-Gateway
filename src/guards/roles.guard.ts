import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles are required on this route, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      user?: { id: string; email: string; roles: string[] };
    }>();
    const user = request.user;

    if (!user?.roles?.length) {
      throw new ForbiddenException('Access denied: no roles assigned');
    }

    if (user.roles.some((role) => role.toLowerCase() === 'admin')) return true;

    const hasRole = requiredRoles.some((role) =>
      user.roles.some((r) => r.toLowerCase() === role.toLowerCase()),
    );

    if (!hasRole) {
      throw new ForbiddenException(`Access denied`);
    }

    return true;
  }
}
