import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'

import {
  CreatePropertyDto,
  CreatePropertyResponse,
  PaginatedPropertiesResponse,
  PropertySingleProps,
  RemovePropertyResponse,
  UpdatePropertyDto,
  UpdatePropertyResponse,
} from '@app/contracts/properties'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

interface PropertiesGrpcService {
  findAll(props: PropertySingleProps): Observable<PaginatedPropertiesResponse>
  create(data: CreatePropertyDto): Observable<CreatePropertyResponse>
  update(request: {
    id: string
    data: Partial<UpdatePropertyDto>
  }): Observable<UpdatePropertyResponse>
  delete(request: { id: string }): Observable<RemovePropertyResponse>
}

@Injectable()
export class PropertiesService {
  private propertiesService!: PropertiesGrpcService
  constructor(
    @Inject(MICRO_SERVICES.PROPERTY_CLIENT)
    private readonly propertiesClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.propertiesService =
      this.propertiesClient.getService<PropertiesGrpcService>(SERVICES.PROPERTY)
  }

  findAll(props: PropertySingleProps): Promise<PaginatedPropertiesResponse> {
    return firstValueFrom(this.propertiesService.findAll(props))
  }

  create(data: CreatePropertyDto): Promise<CreatePropertyResponse> {
    return firstValueFrom(this.propertiesService.create(data))
  }

  update(
    id: string,
    data: Partial<UpdatePropertyDto>,
  ): Promise<UpdatePropertyResponse> {
    return firstValueFrom(this.propertiesService.update({ id, data }))
  }

  delete(id: string): Promise<RemovePropertyResponse> {
    return firstValueFrom(this.propertiesService.delete({ id }))
  }
}
