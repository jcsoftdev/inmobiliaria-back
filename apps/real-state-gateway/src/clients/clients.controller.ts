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

@ApiTags('Clientes')
@ApiExtraModels(PaginatedClientsResponse, Client)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all clients',
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
  @ApiQuery({
    name: 'fields',
    required: false,
    type: String,
    description: `Fields to select. Example: 'id,name, last_name'`,
  })
  findAll(
    @Query() { ...props }: ClientSingleProps,
  ): Promise<PaginatedClientsResponse> {
    console.log({ ...props })
    return this.clientsService.findAll({
      ...props,
    })
  }

  @Post()
  @ApiOkResponse({
    description: 'Create a client',
    type: CreateClientResponse,
  })
  create(@Body() data: CreateClientDto): Promise<CreateClientResponse> {
    return this.clientsService.create(data)
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update a client',
    type: UpdateClientResponse,
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateClientDto,
  ): Promise<UpdateClientResponse> {
    return this.clientsService.update(id, data)
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Remove a client',
    type: RemoveClientResponse,
  })
  delete(@Param('id') id: string): Promise<RemoveClientResponse> {
    return this.clientsService.delete(id)
  }
}
