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
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger'

import {
  CreateAgencyDto,
  PaginatedAgenciesResponse,
  Agency,
  CreateAgencyResponse,
  RemoveAgencyResponse,
  UpdateAgencyResponse,
  UpdateAgencyDto,
  AgencySingleProps,
} from '@app/contracts/agencies'

import { AgenciesService } from '@gateway/agencies/agencies.service'

@Controller('agencies')
@ApiExtraModels(PaginatedAgenciesResponse, Agency)
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
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
    @Query() { ...props }: AgencySingleProps,
  ): Promise<PaginatedAgenciesResponse> {
    return this.agenciesService.findAll(props)
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create agency',
    type: CreateAgencyResponse,
  })
  create(@Body() data: CreateAgencyDto): Promise<CreateAgencyResponse> {
    return this.agenciesService.create(data)
  }

  @Patch(':id')
  @ApiResponse({
    status: 202,
    description: 'Update agency',
    type: UpdateAgencyResponse,
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateAgencyDto,
  ): Promise<UpdateAgencyResponse> {
    return this.agenciesService.update({
      ...data,
      id,
    })
  }

  @Delete(':id')
  @ApiResponse({
    status: 203,
    description: 'Delete agency',
    type: RemoveAgencyResponse,
  })
  delete(@Param('id') id: string): Promise<RemoveAgencyResponse> {
    return this.agenciesService.delete({ id })
  }
}
