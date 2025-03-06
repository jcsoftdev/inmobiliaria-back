import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import {
  AGENCIES_PATTERNS,
  Agency,
  AgencyProps,
  CreateAgencyResponse,
  PaginatedAgenciesResponse,
  RemoveAgencyResponse,
  UpdateAgencyResponse,
} from '@app/contracts/agencies'

@Injectable()
export class AgenciesService {
  constructor(
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly agenciesClient: ClientProxy,
  ) {}

  findAll(props: AgencyProps): Promise<PaginatedAgenciesResponse> {
    return firstValueFrom(
      this.agenciesClient.send<PaginatedAgenciesResponse, AgencyProps>(
        AGENCIES_PATTERNS.FIND_ALL,
        props,
      ),
    )
  }

  create(data: Agency): Promise<CreateAgencyResponse> {
    return firstValueFrom(
      this.agenciesClient.send<CreateAgencyResponse>(
        AGENCIES_PATTERNS.CREATE,
        data,
      ),
    )
  }

  findOne(id: string): Promise<Agency> {
    return firstValueFrom(
      this.agenciesClient.send<Agency>(AGENCIES_PATTERNS.FIND_ONE, id),
    )
  }

  update(id: Agency): Promise<UpdateAgencyResponse> {
    return firstValueFrom(
      this.agenciesClient.send<UpdateAgencyResponse>(
        AGENCIES_PATTERNS.UPDATE,
        id,
      ),
    )
  }

  remove(id: string): Promise<RemoveAgencyResponse> {
    return firstValueFrom(
      this.agenciesClient.send<RemoveAgencyResponse>(
        AGENCIES_PATTERNS.REMOVE,
        id,
      ),
    )
  }
}
