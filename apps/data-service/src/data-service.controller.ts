import { Controller, Get } from '@nestjs/common'
import { DataServiceService } from './data-service.service'

@Controller()
export class DataServiceController {
  constructor(private readonly dataServiceService: DataServiceService) {}

  @Get()
  getHello(): string {
    return this.dataServiceService.getHello()
  }
}
