import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { JwtPayload } from '../auth.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    const { roles } = context.switchToHttp().getRequest<JwtPayload>()

    if (!roles?.some((role) => requiredRoles.includes(role))) {
      throw new ForbiddenException('Insufficient role')
    }

    return true
  }
}
