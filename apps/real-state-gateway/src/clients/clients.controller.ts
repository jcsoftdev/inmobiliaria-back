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
  ApiOperation,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'

import { CreateClientDto, UpdateClientDto } from '@app/contracts/clients'
import {
  Client,
  ClientSingleProps,
  PaginatedClientsResponse,
  CreateClientResponse,
  RemoveClientResponse,
  UpdateClientResponse,
} from '@app/contracts/clients/clients.response'

import { ClientsService } from './clients.service'

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiExtraModels(PaginatedClientsResponse)
  @ApiOkResponse({
    description: 'Get all agencies',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedClientsResponse) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Client) },
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
  ): Promise<PaginatedClientsResponse> {
    return this.clientsService.findAll(props)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  create(@Body() data: CreateClientDto): Promise<CreateClientResponse> {
    return this.clientsService.create(data)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateClientDto,
  ): Promise<UpdateClientResponse> {
    return this.clientsService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<RemoveClientResponse> {
    return this.clientsService.delete(+id)
  }
}
