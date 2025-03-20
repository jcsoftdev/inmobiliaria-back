import { Observable } from 'rxjs'

import {
  Agency,
  AgencySingleProps,
  CreateAgencyResponse,
  PaginatedAgenciesResponse,
  RemoveAgencyResponse,
  UpdateAgencyResponse,
} from '@app/contracts/agencies/agency.response'
import { CreateAgencyDto } from '@app/contracts/agencies/create-agency.dto'
import { UpdateAgencyDto } from '@app/contracts/agencies/update-agency.dto'

export const AGENCIES_PATTERNS = {
  FIND_ALL: 'findAll',
  FIND_ONE: 'findOne',
  CREATE: 'create',
  UPDATE: 'update',
  REMOVE: 'remove',
}

export interface AgenciesGrpcService {
  findAll(props: AgencySingleProps): Observable<PaginatedAgenciesResponse>
  create(data: CreateAgencyDto): Observable<CreateAgencyResponse>
  update(data: UpdateAgencyDto): Observable<UpdateAgencyResponse>
  remove(id: string): Observable<RemoveAgencyResponse>
  findOne(id: string): Observable<Agency>
}
