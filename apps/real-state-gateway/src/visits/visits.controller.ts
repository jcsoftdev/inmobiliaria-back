import { CreateVisitDto, Visit } from '@app/contracts/visits'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { VisitsService } from './visits.service'
import { Observable } from 'rxjs'

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Get()
  findAll(): Observable<Visit[]> {
    return this.visitsService.findAll()
  }

  @Post()
  create(@Body() data: CreateVisitDto): Observable<Visit> {
    return this.visitsService.create(data)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Visit): Observable<Visit> {
    return this.visitsService.update(+id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<Visit> {
    return this.visitsService.delete(+id)
  }
}
