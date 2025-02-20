import { TypedRpcException } from '@app/common/exceptions/rpc.exception'
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
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly propertiesClient: ClientProxy,
  ) {}

  findAll(): Promise<Property[]> {
    return firstValueFrom(
      this.propertiesClient.send<Property[]>(PROPERTIES_PATTERNS.FIND_ALL, {}),
    )
  }

  async create(data: CreatePropertyDto): Promise<CreatePropertyResponse> {
    try {
      const res = firstValueFrom(
        this.propertiesClient.send<CreatePropertyResponse>(
          PROPERTIES_PATTERNS.CREATE,
          data,
        ),
      )

      return res
    } catch (error) {
      console.log({ someError: error })
      throw new TypedRpcException({
        code: 'UNEXPECTED_ERROR',
        message: 'Unexpected error',
        errorType: 'UNEXPECTED_ERROR',
        statusCode: 500,
      })
    }
  }

  findOne(id: number): Observable<Property> {
    return this.propertiesClient.send<Property>(
      PROPERTIES_PATTERNS.FIND_ONE,
      id,
    )
  }

  update(id: Property): Observable<Property> {
    return this.propertiesClient.send<Property>(PROPERTIES_PATTERNS.UPDATE, id)
  }

  remove(id: number): Observable<Property> {
    return this.propertiesClient.send<Property>(PROPERTIES_PATTERNS.REMOVE, id)
  }
}
