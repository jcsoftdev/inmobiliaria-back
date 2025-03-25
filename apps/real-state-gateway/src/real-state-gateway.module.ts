import { Module } from '@nestjs/common'

import { SharedConfigModule } from '@app/config'

import { AgenciesModule } from './agencies/agencies.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { ClientsModule } from './clients/clients.module'
import { CompaniesModule } from './companies/companies.module'
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
    AuthenticationModule,
    CompaniesModule,
    SharedConfigModule,
  ],
  controllers: [RealStateGatewayController],
  providers: [RealStateGatewayService],
})
export class RealStateGatewayModule {}
