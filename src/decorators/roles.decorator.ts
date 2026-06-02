import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorator that marks a route as requiring specific roles.
 * Use together with RolesGuard (always place JwtAuthGuard before RolesGuard).
 *
 * @example
 * @Roles('admin', 'instructor')
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * @Get('protected')
 * someProtectedRoute() {}
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

