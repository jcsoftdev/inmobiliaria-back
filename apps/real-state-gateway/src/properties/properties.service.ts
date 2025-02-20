import {
  CreatePropertyDto,
  CreatePropertyResponse,
  PROPERTIES_PATTERNS,
  Property,
} from '@app/contracts/properties'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'

@Injectable()
export class PropertiesService {
  constructor(
    @Inject('PROPERTIES_CLIENT')
    private readonly propertiesClient: ClientProxy,
  ) {}

  findAll(): Promise<Property[]> {
    return firstValueFrom(
      this.propertiesClient.send<Property[]>(PROPERTIES_PATTERNS.FIND_ALL, {}),
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
