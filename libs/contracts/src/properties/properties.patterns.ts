import { Observable } from 'rxjs'

import { CreatePropertyDto } from '@app/contracts/properties/create-property.dto'
import {
  CreatePropertyResponse,
  PaginatedPropertiesResponse,
  Property,
  PropertySingleProps,
  RemovePropertyResponse,
  UpdatePropertyResponse,
} from '@app/contracts/properties/property.response'
import { UpdatePropertyDto } from '@app/contracts/properties/update-property.dto'

export const PROPERTIES_PATTERNS = {
  FIND_ALL: 'findAll',
  FIND_ONE: 'findOne',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
}

export interface PropertiesGrpcService {
  findAll(props: PropertySingleProps): Observable<PaginatedPropertiesResponse>
  create(data: CreatePropertyDto): Observable<CreatePropertyResponse>
  update(data: UpdatePropertyDto): Observable<UpdatePropertyResponse>
  delete(id: string): Observable<RemovePropertyResponse>
  findOne(id: string): Observable<Property>
}
