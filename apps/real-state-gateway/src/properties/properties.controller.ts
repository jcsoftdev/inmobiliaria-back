import { Observable } from 'rxjs'
import { PaginatedResult } from '@app/common/pagination/paginator'
import {
  CreatePropertyDto,
  CreatePropertyResponse,
  Property,
  PropertySingleProps,
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
  Query,
} from '@nestjs/common'
import { ApiQuery, ApiResponse } from '@nestjs/swagger'

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all properties',
    isArray: true,
    type: PaginatedResult<Property>,
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'perPage', required: false, type: Number })
  findAll(@Query() { ...props }: PropertySingleProps): Promise<Property[]> {
    console.log({ props })
    return this.propertiesService.findAll({
      page: props.page,
      perPage: props.perPage,
    })
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
