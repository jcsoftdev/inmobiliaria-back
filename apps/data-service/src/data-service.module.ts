import { Module } from '@nestjs/common'

import { AgenciesModule } from './agencies/agencies.module'
import { ClientsModule } from './clients/clients.module'
import { DataServiceController } from './data-service.controller'
import { DataServiceService } from './data-service.service'
import { PropertiesModule } from './properties/properties.module'
import { UsersModule } from './users/users.module'
import { VisitsModule } from './visits/visits.module'

@Module({
  imports: [
    AgenciesModule,
    PropertiesModule,
    ClientsModule,
    UsersModule,
    VisitsModule,
  ],
  controllers: [DataServiceController],
  providers: [DataServiceService],
})
export class DataServiceModule {}
