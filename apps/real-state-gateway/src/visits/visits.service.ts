import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import {
  CreateVisitDto,
  VISITS_PATTERNS,
  CreateVisitResponse,
  RemoveVisitResponse,
  UpdateVisitResponse,
  PaginatedVisitsResponse,
  VisitProps,
  UpdateVisitDto,
} from '@app/contracts/visits'

@Injectable()
export class VisitsService {
  constructor(
    @Inject('USER_MANAGEMENT_CLIENT')
    private readonly userManagementClient: ClientProxy,
  ) {}

  findAll(props: VisitProps): Promise<PaginatedVisitsResponse> {
    return firstValueFrom(
      this.userManagementClient.send<PaginatedVisitsResponse, VisitProps>(
        VISITS_PATTERNS.FIND_ALL,
        props,
      ),
    )
  }

  create(data: CreateVisitDto): Promise<CreateVisitResponse> {
    return firstValueFrom(
      this.userManagementClient.send<CreateVisitResponse>(
        VISITS_PATTERNS.CREATE,
        data,
      ),
    )
  }

  update(
    id: string,
    data: Partial<UpdateVisitDto>,
  ): Promise<UpdateVisitResponse> {
    return firstValueFrom(
      this.userManagementClient.send<UpdateVisitResponse>(
        VISITS_PATTERNS.UPDATE,
        {
          id,
          data,
        },
      ),
    )
  }

  delete(id: string): Promise<RemoveVisitResponse> {
    return firstValueFrom(
      this.userManagementClient.send<RemoveVisitResponse>(
        VISITS_PATTERNS.REMOVE,
        { id },
      ),
    )
  }
}
