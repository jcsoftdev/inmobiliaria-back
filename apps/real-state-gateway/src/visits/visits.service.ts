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
    @Inject('USER_MANAGEMENT_CLIENT')
    private readonly userManagementClient: ClientProxy,
  ) {}

  findAll(): Observable<Visit[]> {
    return this.userManagementClient.send<Visit[]>(VISITS_PATTERNS.FIND_ALL, {})
  }

  create(data: CreateVisitDto): Promise<VisitCreation> {
    return firstValueFrom(
      this.userManagementClient.send<VisitCreation>(
        VISITS_PATTERNS.CREATE,
        data,
      ),
    )
  }

  update(id: number, data: Partial<Visit>): Observable<Visit> {
    return this.userManagementClient.send<Visit>(VISITS_PATTERNS.UPDATE, {
      id,
      data,
    })
  }

  delete(id: number): Observable<Visit> {
    return this.userManagementClient.send<Visit>(VISITS_PATTERNS.REMOVE, { id })
  }
}
