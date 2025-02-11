import { Property } from '@app/contracts/properties'
import { PropertiesService } from '@gateway/properties/properties.service'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { Observable } from 'rxjs'

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  findAll(): Observable<Property[]> {
    return this.propertiesService.findAll()
  }

  @Post()
  create(@Body() data: Property): Observable<Property> {
    return this.propertiesService.create(data)
  }
}
