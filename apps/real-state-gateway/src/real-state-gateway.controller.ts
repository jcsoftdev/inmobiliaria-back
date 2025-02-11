import { Controller, Get } from '@nestjs/common'
import { RealStateGatewayService } from './real-state-gateway.service'

@Controller()
export class RealStateGatewayController {
  constructor(
    private readonly realStateGatewayService: RealStateGatewayService,
  ) {}

  @Get()
  getHello(): string {
    return this.realStateGatewayService.getHello()
  }
}
