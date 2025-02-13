import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common'
import { Client } from '@app/contracts/clients/clients.entity'
import { ClientsService } from './clients.service'
import { Observable } from 'rxjs'

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(): Observable<Client[]> {
    return this.clientsService.findAll()
  }

  @Post()
  create(@Body() data: Client): Observable<Client> {
    return this.clientsService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Client): Observable<Client> {
    return this.clientsService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<Client> {
    return this.clientsService.delete(+id)
  }
}
