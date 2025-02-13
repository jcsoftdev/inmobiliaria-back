import { AGENCIES_PATTERNS, Agency } from '@app/contracts/agencies'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Injectable()
export class AgenciesService {
  constructor(
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly agenciesClient: ClientProxy,
  ) {}

  findAll(): Observable<Agency[]> {
    return this.agenciesClient.send<Agency[]>(AGENCIES_PATTERNS.FIND_ALL, {})
  }

  create(data: Agency): Observable<Agency> {
    return this.agenciesClient.send<Agency>(AGENCIES_PATTERNS.CREATE, data)
  }

  findOne(id: number): Observable<Agency> {
    return this.agenciesClient.send<Agency>(AGENCIES_PATTERNS.FIND_ONE, id)
  }

  update(id: Agency): Observable<Agency> {
    return this.agenciesClient.send<Agency>(AGENCIES_PATTERNS.UPDATE, id)
  }

  remove(id: number): Observable<Agency> {
    return this.agenciesClient.send<Agency>(AGENCIES_PATTERNS.REMOVE, id)
  }
}
