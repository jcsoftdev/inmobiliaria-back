import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { AuthResponse, LoginDto, RefreshDto } from './authentication.dto'
import { AuthenticationService } from './authentication.service'

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOkResponse({
    description: 'Sign in',
    type: AuthResponse,
  })
  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authenticationService.login(data)
  }

  @ApiOkResponse({
    description: 'Refresh token',
    type: AuthResponse,
  })
  @Post('refresh')
  async refresh(@Body() data: RefreshDto) {
    return this.authenticationService.refreshToken(data.token)
  }
}
