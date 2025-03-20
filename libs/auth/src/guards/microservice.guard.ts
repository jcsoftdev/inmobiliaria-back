import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RpcException } from '@nestjs/microservices'

import { JwtPayload } from '../auth.interface'

@Injectable()
export class MicroserviceAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToRpc()
    const data = ctx.getData<{
      token: string
      user?: JwtPayload
    }>()

    const token = data?.token
    if (!token) {
      throw new RpcException(new UnauthorizedException('Token missing'))
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token)
      data.user = payload // ✅ Add user directly into the payload (safe)
      return true
    } catch {
      throw new RpcException(new UnauthorizedException('Invalid token'))
    }
  }
}
