import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'

import {
  CreatePropertyDto,
  CreatePropertyResponse,
  PROPERTIES_PATTERNS,
  Property,
  PropertyProps,
  PropertySingleProps,
} from '@app/contracts/properties'

@Injectable()
export class PropertiesService {
  constructor(
    @Inject('PROPERTIES_CLIENT')
    private readonly propertiesClient: ClientProxy,
  ) {}

  findAll(props: PropertySingleProps): Promise<Property[]> {
    return firstValueFrom(
      this.propertiesClient.send<Property[], PropertyProps>(
        PROPERTIES_PATTERNS.FIND_ALL,
        {
          ...props,
        },
      ),
    )
  }

  create(data: CreatePropertyDto): Promise<CreatePropertyResponse> {
    return firstValueFrom(
      this.propertiesClient.send<CreatePropertyResponse>(
        PROPERTIES_PATTERNS.CREATE,
        data,
      ),
    )
  }

  update(id: number, data: Partial<Property>): Observable<Property> {
    return this.propertiesClient.send<Property>(PROPERTIES_PATTERNS.UPDATE, {
      id,
      data,
    })
  }

  delete(id: number): Observable<Property> {
    return this.propertiesClient.send<Property>(PROPERTIES_PATTERNS.REMOVE, {
      id,
    })
  }
}
