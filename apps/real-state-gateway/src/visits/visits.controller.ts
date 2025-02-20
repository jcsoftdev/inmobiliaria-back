import { CreateVisitDto, Visit, VisitCreation } from '@app/contracts/visits'
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
import { ApiResponse } from '@nestjs/swagger'

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all visits',
    isArray: true,
    type: Visit,
  })
  findAll(): Observable<Visit[]> {
    return this.visitsService.findAll()
  }

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VisitCreation,
  })
  @Post()
  create(@Body() data: CreateVisitDto): Promise<VisitCreation> {
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
