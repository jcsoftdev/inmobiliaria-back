import { AGENCIES_PATTERNS, Agency } from '@app/contracts/agencies'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Injectable()
export class AgenciesService {
  constructor(
    @Inject('USER_MANAGEMENT_CLIENT')
    private readonly userManagementClient: ClientProxy,
  ) {}

  findAll(): Observable<Agency[]> {
    console.log('findAll')
    return this.userManagementClient.send<Agency[]>(
      AGENCIES_PATTERNS.FIND_ALL,
      {},
    )
  }

  create(data: Agency): Observable<Agency> {
    return this.userManagementClient.send<Agency>(
      AGENCIES_PATTERNS.CREATE,
      data,
    )
  }
}
