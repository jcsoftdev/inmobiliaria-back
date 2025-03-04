import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import {
  CreateVisitDto,
  VISITS_PATTERNS,
  Visit,
  CreateVisitResponse,
  VisitProps,
  PaginatedVisitsResponse,
  UpdateVisitResponse,
  RemoveVisitResponse,
} from '@app/contracts/visits'

@Injectable()
export class VisitsService {
  constructor(
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly visitsClient: ClientProxy,
  ) {}

  async create(data: CreateVisitDto): Promise<CreateVisitResponse> {
    const response = await firstValueFrom(
      this.visitsClient.send<CreateVisitResponse>(VISITS_PATTERNS.CREATE, data),
    )
    return response
  }

  findAll(props: VisitProps): Promise<PaginatedVisitsResponse> {
    return firstValueFrom(
      this.visitsClient.send<PaginatedVisitsResponse, VisitProps>(
        VISITS_PATTERNS.FIND_ALL,
        props,
      ),
    )
  }

  findOne(id: number): Promise<Visit> {
    return firstValueFrom(
      this.visitsClient.send<Visit>(VISITS_PATTERNS.FIND_ONE, id),
    )
  }

  update(id: Visit): Promise<UpdateVisitResponse> {
    return firstValueFrom(
      this.visitsClient.send<UpdateVisitResponse>(VISITS_PATTERNS.UPDATE, id),
    )
  }

  remove(id: number): Promise<RemoveVisitResponse> {
    return firstValueFrom(
      this.visitsClient.send<RemoveVisitResponse>(VISITS_PATTERNS.REMOVE, id),
    )
  }
}
