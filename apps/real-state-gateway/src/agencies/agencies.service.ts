import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { PaginateOptions } from '@app/common/pagination'
import {
  AGENCIES_PATTERNS,
  PaginatedAgenciesResponse,
  Agency,
  CreateAgencyResponse,
  RemoveAgencyResponse,
  UpdateAgencyResponse,
  CreateAgencyDto,
} from '@app/contracts/agencies'

@Injectable()
export class AgenciesService {
  constructor(
    @Inject('USER_MANAGEMENT_CLIENT')
    private readonly userManagementClient: ClientProxy,
  ) {}

  findAll(props: PaginateOptions): Promise<PaginatedAgenciesResponse> {
    return firstValueFrom(
      this.userManagementClient.send<
        PaginatedAgenciesResponse,
        PaginateOptions
      >(AGENCIES_PATTERNS.FIND_ALL, props),
    )
  }

  create(data: CreateAgencyDto): Promise<CreateAgencyResponse> {
    return firstValueFrom(
      this.userManagementClient.send<CreateAgencyResponse>(
        AGENCIES_PATTERNS.CREATE,
        data,
      ),
    )
  }

  update(id: number, data: Partial<Agency>): Promise<UpdateAgencyResponse> {
    return firstValueFrom(
      this.userManagementClient.send<UpdateAgencyResponse>(
        AGENCIES_PATTERNS.UPDATE,
        {
          id,
          data,
        },
      ),
    )
  }

  delete(id: number): Promise<RemoveAgencyResponse> {
    return firstValueFrom(
      this.userManagementClient.send<RemoveAgencyResponse>(
        AGENCIES_PATTERNS.REMOVE,
        {
          id,
        },
      ),
    )
  }
}
