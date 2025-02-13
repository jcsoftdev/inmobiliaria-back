import { Property } from '@app/contracts/properties'
import { PropertiesService } from '@gateway/properties/properties.service'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  findAll(): Observable<Property[]> {
    console.log('Hello')
    return this.propertiesService.findAll()
  }

  @Post()
  create(@Body() data: Property): Observable<Property> {
    return this.propertiesService.create(data)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Property,
  ): Observable<Property> {
    return this.propertiesService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<Property> {
    return this.propertiesService.delete(+id)
  }
}
