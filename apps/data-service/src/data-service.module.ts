import { Module } from '@nestjs/common'
import { DataServiceController } from './data-service.controller'
import { DataServiceService } from './data-service.service'
import { AgenciesModule } from './agencies/agencies.module'
import { PropertiesModule } from './properties/properties.module'

@Module({
  imports: [AgenciesModule, PropertiesModule],
  controllers: [DataServiceController],
  providers: [DataServiceService],
})
export class DataServiceModule {}
