import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'

import {
  CreateVisitDto,
  CreateVisitResponse,
  RemoveVisitResponse,
  UpdateVisitResponse,
  PaginatedVisitsResponse,
  VisitProps,
  UpdateVisitDto,
  VisitSingleProps,
} from '@app/contracts/visits'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

interface VisitsGrpcService {
  findAll(props: VisitSingleProps): Observable<PaginatedVisitsResponse>
  create(data: CreateVisitDto): Observable<CreateVisitResponse>
  update(request: {
    id: string
    data: Partial<UpdateVisitDto>
  }): Observable<UpdateVisitResponse>
  delete(request: { id: string }): Observable<RemoveVisitResponse>
}

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
    return firstValueFrom(
      // this.userManagementClient.send<PaginatedVisitsResponse, VisitProps>(
      //   VISITS_PATTERNS.FIND_ALL,
      //   props,
      // ),
      this.visitsService.findAll(props),
    )
  }

  create(data: CreateVisitDto): Promise<CreateVisitResponse> {
    return firstValueFrom(
      // this.userManagementClient.send<CreateVisitResponse>(
      //   VISITS_PATTERNS.CREATE,
      //   data,
      // ),
      this.visitsService.create(data),
    )
  }

  update(
    id: string,
    data: Partial<UpdateVisitDto>,
  ): Promise<UpdateVisitResponse> {
    return firstValueFrom(
      // this.userManagementClient.send<UpdateVisitResponse>(
      //   VISITS_PATTERNS.UPDATE,
      //   {
      //     id,
      //     data,
      //   },
      // ),
      this.visitsService.update({ id, data }),
    )
  }

  delete(id: string): Promise<RemoveVisitResponse> {
    return firstValueFrom(
      // this.userManagementClient.send<RemoveVisitResponse>(
      //   VISITS_PATTERNS.REMOVE,
      //   { id },
      // ),
      this.visitsService.delete({ id }),
    )
  }
}
