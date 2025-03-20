import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
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
  VisitsGrpcService,
  UpdateVisitDto,
} from '@app/contracts/visits'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

@Injectable()
export class VisitsService {
  private visitsService!: VisitsGrpcService

  constructor(
    @Inject(MICRO_SERVICES.DATABASE_CLIENT)
    private readonly visitsClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.visitsService = this.visitsClient.getService<VisitsGrpcService>(
      SERVICES.VISIT,
    )
  }

  create(data: CreateVisitDto): Promise<CreateVisitResponse> {
    return firstValueFrom(this.visitsService.create(data))
  }

  findAll(props: VisitProps): Promise<PaginatedVisitsResponse> {
    return firstValueFrom(this.visitsService.findAll(props))
  }

  findOne(id: string): Promise<Visit> {
    return firstValueFrom(this.visitsService.findOne(id))
  }

  update(data: UpdateVisitDto): Promise<UpdateVisitResponse> {
    return firstValueFrom(this.visitsService.update(data))
  }

  remove(id: string): Promise<RemoveVisitResponse> {
    return firstValueFrom(
      this.visitsClient.send<RemoveVisitResponse>(VISITS_PATTERNS.REMOVE, id),
    )
  }
}
