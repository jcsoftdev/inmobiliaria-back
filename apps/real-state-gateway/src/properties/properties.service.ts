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
    @Inject('PROPERTIES_CLIENT')
    private readonly propertiesClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.propertiesService =
      this.propertiesClient.getService<PropertiesGrpcService>('PropertyService')
  }

  findAll(props: PropertySingleProps): Promise<PaginatedPropertiesResponse> {
    return firstValueFrom(
      // this.propertiesClient.send<PaginatedPropertiesResponse, PropertyProps>(
      //   PROPERTIES_PATTERNS.FIND_ALL,
      //   {
      //     ...props,
      //   },
      // ),
      this.propertiesService.findAll(props),
    )
  }

  create(data: CreatePropertyDto): Promise<CreatePropertyResponse> {
    return firstValueFrom(
      // this.propertiesClient.send<CreatePropertyResponse>(
      //   PROPERTIES_PATTERNS.CREATE,
      //   data,
      // ),
      this.propertiesService.create(data),
    )
  }

  update(
    id: string,
    data: Partial<UpdatePropertyDto>,
  ): Promise<UpdatePropertyResponse> {
    return firstValueFrom(
      // this.propertiesClient.send<UpdatePropertyResponse>(
      //   PROPERTIES_PATTERNS.UPDATE,
      //   {
      //     id,
      //     data,
      //   },
      // ),
      this.propertiesService.update({ id, data }),
    )
  }

  delete(id: string): Promise<RemovePropertyResponse> {
    return firstValueFrom(
      // this.propertiesClient.send<RemovePropertyResponse>(
      //   PROPERTIES_PATTERNS.REMOVE,
      //   {
      //     id,
      //   },
      // ),
      this.propertiesService.delete({ id }),
    )
  }
}
