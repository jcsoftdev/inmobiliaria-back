import { VISITS_PATTERNS, Visit } from '@app/contracts/visits'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Injectable()
export class VisitsService {
  constructor(
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly visitsClient: ClientProxy,
  ) {}

  create(data: Visit): Observable<Visit> {
    return this.visitsClient.send<Visit>(VISITS_PATTERNS.CREATE, data)
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
