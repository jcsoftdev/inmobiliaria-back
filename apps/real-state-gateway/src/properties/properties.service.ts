import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import {
  CreatePropertyDto,
  CreatePropertyResponse,
  PaginatedPropertiesResponse,
  PropertySingleProps,
  RemovePropertyResponse,
  UpdatePropertyDto,
  UpdatePropertyResponse,
  PropertiesGrpcService,
} from '@app/contracts/properties'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

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

  update(data: UpdatePropertyDto): Promise<UpdatePropertyResponse> {
    return firstValueFrom(this.propertiesService.update(data))
  }

  delete({ id }: { id: string }): Promise<RemovePropertyResponse> {
    return firstValueFrom(this.propertiesService.delete({ id }))
  }
}
