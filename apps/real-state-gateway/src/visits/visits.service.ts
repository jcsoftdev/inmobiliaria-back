import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import {
  CreateVisitDto,
  CreateVisitResponse,
  RemoveVisitResponse,
  UpdateVisitResponse,
  PaginatedVisitsResponse,
  VisitProps,
  UpdateVisitDto,
  VisitsGrpcService,
} from '@app/contracts/visits'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

@Injectable()
export class VisitsService {
  private visitsService!: VisitsGrpcService
  constructor(
    @Inject(MICRO_SERVICES.USER_MANAGEMENT_CLIENT)
    private readonly userManagementClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.visitsService =
      this.userManagementClient.getService<VisitsGrpcService>(SERVICES.VISIT)
  }

  findAll(props: VisitProps): Promise<PaginatedVisitsResponse> {
    return firstValueFrom(this.visitsService.findAll(props))
  }

  create(data: CreateVisitDto): Promise<CreateVisitResponse> {
    return firstValueFrom(this.visitsService.create(data))
  }

  update(data: UpdateVisitDto): Promise<UpdateVisitResponse> {
    return firstValueFrom(this.visitsService.update(data))
  }

  delete(id: string): Promise<RemoveVisitResponse> {
    return firstValueFrom(this.visitsService.delete(id))
  }
}
