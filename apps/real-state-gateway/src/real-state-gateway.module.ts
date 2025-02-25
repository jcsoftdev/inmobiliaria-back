import { Module } from '@nestjs/common'

import { AgenciesModule } from './agencies/agencies.module'
import { ClientsModule } from './clients/clients.module'
import { PropertiesModule } from './properties/properties.module'
import { RealStateGatewayController } from './real-state-gateway.controller'
import { RealStateGatewayService } from './real-state-gateway.service'
import { UsersModule } from './users/users.module'
import { VisitsModule } from './visits/visits.module'

@Module({
  imports: [
    PropertiesModule,
    AgenciesModule,
    UsersModule,
    ClientsModule,
    VisitsModule,
  ],
  controllers: [RealStateGatewayController],
  providers: [RealStateGatewayService],
})
export class RealStateGatewayModule {}
