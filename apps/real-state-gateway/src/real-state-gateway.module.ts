import { Module } from '@nestjs/common'
import { RealStateGatewayController } from './real-state-gateway.controller'
import { RealStateGatewayService } from './real-state-gateway.service'
import { PropertiesModule } from './properties/properties.module'
import { AgenciesModule } from './agencies/agencies.module'
import { UsersModule } from './users/users.module'
import { ClientsModule } from './clients/clients.module'
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
