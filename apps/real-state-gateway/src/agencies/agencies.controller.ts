import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Query,
} from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger'

import {
  PaginatedAgenciesResponse,
  Agency,
  CreateAgencyResponse,
  RemoveAgencyResponse,
  UpdateAgencyResponse,
} from '@app/contracts/agencies'
import { PropertySingleProps } from '@app/contracts/properties'

import { AgenciesService } from '@gateway/agencies/agencies.service'

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  @ApiExtraModels(PaginatedAgenciesResponse)
  @ApiOkResponse({
    description: 'Get all agencies',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedAgenciesResponse) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Agency) },
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
  ): Promise<PaginatedAgenciesResponse> {
    return this.agenciesService.findAll(props)
  }

  @Post()
  create(@Body() data: Agency): Promise<CreateAgencyResponse> {
    return this.agenciesService.create(data)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Agency,
  ): Promise<UpdateAgencyResponse> {
    return this.agenciesService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<RemoveAgencyResponse> {
    return this.agenciesService.delete(+id)
  }
}
