import {
  CreatePropertyDto,
  CreatePropertyResponse,
  Property,
} from '@app/contracts/properties'
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
import { ApiResponse } from '@nestjs/swagger'
import { Observable } from 'rxjs'

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all properties',
    isArray: true,
    type: Property,
  })
  findAll(): Promise<Property[]> {
    return this.propertiesService.findAll()
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a property response',
    type: CreatePropertyResponse,
  })
  create(@Body() data: CreatePropertyDto): Promise<CreatePropertyResponse> {
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
