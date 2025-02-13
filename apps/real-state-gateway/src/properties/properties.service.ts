import { PROPERTIES_PATTERNS, Property } from '@app/contracts/properties'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Injectable()
export class PropertiesService {
  constructor(
    @Inject('PROPERTIES_CLIENT')
    private readonly propertiesClient: ClientProxy,
  ) {}

  findAll(): Observable<Property[]> {
    return this.propertiesClient.send<Property[]>(
      PROPERTIES_PATTERNS.FIND_ALL,
      {},
    )
  }

  create(data: Property): Observable<Property> {
    return this.propertiesClient.send<Property>(
      PROPERTIES_PATTERNS.CREATE,
      data,
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
