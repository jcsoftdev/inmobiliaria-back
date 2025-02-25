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
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import { Observable } from 'rxjs'

import {
  CreatePropertyDto,
  CreatePropertyResponse,
  PaginatedPropertiesResponse,
  Property,
  PropertySingleProps,
} from '@app/contracts/properties'

import { PropertiesService } from '@gateway/properties/properties.service'

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  @ApiExtraModels(PaginatedPropertiesResponse)
  @ApiOkResponse({
    description: 'Get all agencies',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedPropertiesResponse) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Property) },
            },
          },
        },
      ],
    },
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
