import { Agency } from '@app/contracts/agencies'
import { AgenciesService } from '@gateway/agencies/agencies.service'
import { Body, Controller, Get, Post } from '@nestjs/common'
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
}
