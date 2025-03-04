import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt'

import { JwtPayload } from '../auth.interface'
import { jwtConstants } from '../constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jwtExtractor: JwtFromRequestFunction<Request> =
      ExtractJwt.fromAuthHeaderAsBearerToken()
    super({
      jwtFromRequest: jwtExtractor,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  validate(payload: JwtPayload) {
    return {
      ...payload,
    }
  }
}
