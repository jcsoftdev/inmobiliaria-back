import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import {
  CreatePropertyDto,
  CreatePropertyResponse,
  PaginatedPropertiesResponse,
  PROPERTIES_PATTERNS,
  PropertyProps,
  PropertySingleProps,
  RemovePropertyResponse,
  UpdatePropertyDto,
  UpdatePropertyResponse,
} from '@app/contracts/properties'

@Injectable()
export class PropertiesService {
  constructor(
    @Inject('PROPERTIES_CLIENT')
    private readonly propertiesClient: ClientProxy,
  ) {}

  findAll(props: PropertySingleProps): Promise<PaginatedPropertiesResponse> {
    return firstValueFrom(
      this.propertiesClient.send<PaginatedPropertiesResponse, PropertyProps>(
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

  update(
    id: string,
    data: Partial<UpdatePropertyDto>,
  ): Promise<UpdatePropertyResponse> {
    return firstValueFrom(
      this.propertiesClient.send<UpdatePropertyResponse>(
        PROPERTIES_PATTERNS.UPDATE,
        {
          id,
          data,
        },
      ),
    )
  }

  delete(id: string): Promise<RemovePropertyResponse> {
    return firstValueFrom(
      this.propertiesClient.send<RemovePropertyResponse>(
        PROPERTIES_PATTERNS.REMOVE,
        {
          id,
        },
      ),
    )
  }
}
