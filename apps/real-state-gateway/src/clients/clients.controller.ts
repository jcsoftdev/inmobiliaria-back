import { ClientsService } from './clients.service'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateClientDto, UpdateClientDto } from '@app/contracts/clients'
import {
  Client,
  CreationClient,
  RemoveClient,
  UpdateClient,
} from '@app/contracts/clients/clients.response'

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll()
  }

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  create(@Body() data: CreateClientDto): Promise<CreationClient> {
    return this.clientsService.create(data)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateClientDto,
  ): Promise<UpdateClient> {
    return this.clientsService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<RemoveClient> {
    return this.clientsService.delete(+id)
  }
}
