import {
  CreateVisitDto,
  VISITS_PATTERNS,
  Visit,
  VisitCreation,
} from '@app/contracts/visits'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'

@Injectable()
export class VisitsService {
  constructor(
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly visitsClient: ClientProxy,
  ) {}

  async create(data: CreateVisitDto): Promise<VisitCreation> {
    const response = await firstValueFrom(
      this.visitsClient.send<VisitCreation>(VISITS_PATTERNS.CREATE, data),
    )
    console.log('USER MANAGEMENT: ', response.message.toString())
    return response
  }

  findAll(): Observable<Visit[]> {
    return this.visitsClient.send<Visit[]>(VISITS_PATTERNS.FIND_ALL, {})
  }

  findOne(id: number): Observable<Visit> {
    return this.visitsClient.send<Visit>(VISITS_PATTERNS.FIND_ONE, id)
  }

  update(id: Visit): Observable<Visit> {
    return this.visitsClient.send<Visit>(VISITS_PATTERNS.UPDATE, id)
  }

  remove(id: number): Observable<Visit> {
    return this.visitsClient.send<Visit>(VISITS_PATTERNS.REMOVE, id)
  }
}
