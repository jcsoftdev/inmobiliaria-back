import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger'

import { ClientSingleProps } from '@app/contracts/clients/clients.response'
import {
  CreateVisitDto,
  Visit,
  CreateVisitResponse,
  PaginatedVisitsResponse,
  UpdateVisitResponse,
  RemoveVisitResponse,
  UpdateVisitDto,
} from '@app/contracts/visits'

import { VisitsService } from './visits.service'

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Get()
  @ApiExtraModels(PaginatedVisitsResponse)
  @ApiOkResponse({
    description: 'Get all visits',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedVisitsResponse) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Visit) },
            },
          },
        },
      ],
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'perPage', required: false, type: Number })
  findAll(
    @Query() { ...props }: ClientSingleProps,
  ): Promise<PaginatedVisitsResponse> {
    return this.visitsService.findAll({
      perPage: props.perPage ? +props.perPage : undefined,
      page: props.page ? +props.page : undefined,
    })
  }

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateVisitResponse,
  })
  @Post()
  create(@Body() data: CreateVisitDto): Promise<CreateVisitResponse> {
    return this.visitsService.create(data)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateVisitDto,
  ): Promise<UpdateVisitResponse> {
    return this.visitsService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<RemoveVisitResponse> {
    return this.visitsService.delete(+id)
  }
}
