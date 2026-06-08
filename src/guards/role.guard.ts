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
    const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required on this route, allow access
    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      user?: { id: string; email: string; data: { role: string } };
    }>();
    const user = request.user;

    if (!user?.data.role) {
      throw new ForbiddenException('Access denied: no roles assigned');
    }

    if (user.data.role === 'admin') return true;

    const hasRole = user.data.role === requiredRole.toLowerCase();

    if (!hasRole) {
      throw new ForbiddenException(`Access denied`);
    }

    return true;
  }
}
