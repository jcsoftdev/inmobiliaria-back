import { Module } from '@nestjs/common'
import { RealStateGatewayController } from './real-state-gateway.controller'
import { RealStateGatewayService } from './real-state-gateway.service'
import { PropertiesModule } from './properties/properties.module'
import { AgenciesModule } from './agencies/agencies.module'

@Module({
  imports: [PropertiesModule, AgenciesModule],
  controllers: [RealStateGatewayController],
  providers: [RealStateGatewayService],
})
export class RealStateGatewayModule {}
