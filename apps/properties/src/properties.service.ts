import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'

import { PaginatedResult } from '@app/common/pagination'
import {
  CreatePropertyDto,
  CreatePropertyResponse,
  PROPERTIES_PATTERNS,
  Property,
  PropertyProps,
} from '@app/contracts/properties'
import { MICRO_SERVICES } from '@app/shared'

@Injectable()
export class PropertiesService {
  constructor(
    @Inject(MICRO_SERVICES.DATABASE_CLIENT)
    private readonly propertiesClient: ClientProxy,
  ) {}

  findAll(props: PropertyProps): Promise<PaginatedResult<Property>> {
    return firstValueFrom(
      this.propertiesClient.send<PaginatedResult<Property>, PropertyProps>(
        PROPERTIES_PATTERNS.FIND_ALL,
        props,
      ),
    )
  }

  async create(data: CreatePropertyDto): Promise<CreatePropertyResponse> {
    const res = firstValueFrom(
      this.propertiesClient.send<CreatePropertyResponse, CreatePropertyDto>(
        PROPERTIES_PATTERNS.CREATE,
        data,
      ),
    )

    return res
  }

  findOne(id: string): Observable<Property> {
    return this.propertiesClient.send<Property>(
      PROPERTIES_PATTERNS.FIND_ONE,
      id,
    )
  }

  update(id: Property): Observable<Property> {
    return this.propertiesClient.send<Property>(PROPERTIES_PATTERNS.UPDATE, id)
  }

  remove(id: string): Observable<Property> {
    return this.propertiesClient.send<Property>(PROPERTIES_PATTERNS.REMOVE, id)
  }
}
