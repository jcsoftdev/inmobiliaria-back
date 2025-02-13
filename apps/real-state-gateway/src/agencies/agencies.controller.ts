import { Agency } from '@app/contracts/agencies'
import { AgenciesService } from '@gateway/agencies/agencies.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  findAll(): Observable<Agency[]> {
    return this.agenciesService.findAll()
  }

  @Post()
  create(@Body() data: Agency): Observable<Agency> {
    return this.agenciesService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Agency): Observable<Agency> {
    return this.agenciesService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<Agency> {
    return this.agenciesService.delete(+id)
  }
}
