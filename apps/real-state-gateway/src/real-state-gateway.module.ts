import { Module } from '@nestjs/common'
import { RealStateGatewayController } from './real-state-gateway.controller'
import { RealStateGatewayService } from './real-state-gateway.service'
import { PropertiesModule } from './properties/properties.module'

@Module({
  imports: [PropertiesModule],
  controllers: [RealStateGatewayController],
  providers: [RealStateGatewayService],
})
export class RealStateGatewayModule {}
