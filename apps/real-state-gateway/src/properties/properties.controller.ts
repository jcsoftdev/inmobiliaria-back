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
  BadRequestException,
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
    status: 200,
    description: 'Create property ',
    type: CreatePropertyResponse,
  })
  create(@Body() data: CreatePropertyDto): Promise<CreatePropertyResponse> {
    console.log('Received DTO:', data)
    return this.propertiesService.create(data)
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'Update property',
    type: UpdatePropertyResponse,
  })
  update(
    @Body() data: UpdatePropertyDto,
    @Query('id') queryId?: string,
  ): Promise<UpdatePropertyResponse> {
    const id = data.id ?? queryId
    if (!id) {
      throw new BadRequestException('Property ID is required')
    }
    return this.propertiesService.update({ ...data, id })
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete property',
    type: CreatePropertyResponse,
  })
  delete(@Param('id') id: string): Promise<RemovePropertyResponse> {
    return this.propertiesService.delete({ id })
  }
}
