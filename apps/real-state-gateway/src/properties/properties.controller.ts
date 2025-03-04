import { JwtAuthGuard } from '@libs/auth'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger'

import {
  CreatePropertyDto,
  CreatePropertyResponse,
  PaginatedPropertiesResponse,
  Property,
  PropertySingleProps,
  RemovePropertyResponse,
  UpdatePropertyDto,
  UpdatePropertyResponse,
} from '@app/contracts/properties'

import { ACCESS_TOKEN_SWAGGER } from '@gateway/constants'
import { PropertiesService } from '@gateway/properties/properties.service'

@Controller('properties')
@ApiBearerAuth(ACCESS_TOKEN_SWAGGER)
@UseGuards(JwtAuthGuard)
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  @ApiExtraModels(PaginatedPropertiesResponse, Property)
  @ApiOkResponse({
    description: 'Get all properties',
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
  findAll(
    @Query() { ...props }: PropertySingleProps,
  ): Promise<PaginatedPropertiesResponse> {
    return this.propertiesService.findAll({
      page: props.page,
      perPage: props.perPage,
    })
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create property ',
    type: CreatePropertyResponse,
  })
  create(@Body() data: CreatePropertyDto): Promise<CreatePropertyResponse> {
    return this.propertiesService.create(data)
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    description: 'Update property',
    type: UpdatePropertyResponse,
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdatePropertyDto,
  ): Promise<UpdatePropertyResponse> {
    return this.propertiesService.update(+id, data)
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'Delete property',
    type: CreatePropertyResponse,
  })
  delete(@Param('id') id: string): Promise<RemovePropertyResponse> {
    return this.propertiesService.delete(+id)
  }
}
