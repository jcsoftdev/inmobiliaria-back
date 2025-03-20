import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { PaginatedResult } from '@app/common/pagination'
import {
  CreatePropertyDto,
  CreatePropertyResponse,
  PropertiesGrpcService,
  Property,
  PropertyProps,
  RemovePropertyResponse,
  UpdatePropertyDto,
  UpdatePropertyResponse,
} from '@app/contracts/properties'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

@Injectable()
export class PropertiesService {
  private propertiesService!: PropertiesGrpcService

  constructor(
    @Inject(MICRO_SERVICES.DATABASE_CLIENT)
    private readonly propertiesClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.propertiesService =
      this.propertiesClient.getService<PropertiesGrpcService>(SERVICES.PROPERTY)
  }

  findAll(props: PropertyProps): Promise<PaginatedResult<Property>> {
    return firstValueFrom(this.propertiesService.findAll(props))
  }

  async create(data: CreatePropertyDto): Promise<CreatePropertyResponse> {
    const res = firstValueFrom(this.propertiesService.create(data))

    return res
  }

  findOne(id: string): Promise<Property> {
    return firstValueFrom(this.propertiesService.findOne(id))
  }

  update(data: UpdatePropertyDto): Promise<UpdatePropertyResponse> {
    return firstValueFrom(this.propertiesService.update(data))
  }

  delete(id: string): Promise<RemovePropertyResponse> {
    return firstValueFrom(this.propertiesService.delete(id))
  }
}
