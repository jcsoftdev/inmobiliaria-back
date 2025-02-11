import { Module } from '@nestjs/common'
import { DataServiceController } from './data-service.controller'
import { DataServiceService } from './data-service.service'

@Module({
  imports: [],
  controllers: [DataServiceController],
  providers: [DataServiceService],
})
export class DataServiceModule {}
