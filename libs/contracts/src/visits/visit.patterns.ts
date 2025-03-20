import { Observable } from 'rxjs'

import { CreateVisitDto } from '@app/contracts/visits/create-visit.dto'
import { UpdateVisitDto } from '@app/contracts/visits/update-visit.dto'
import {
  CreateVisitResponse,
  PaginatedVisitsResponse,
  RemoveVisitResponse,
  UpdateVisitResponse,
  Visit,
  VisitSingleProps,
} from '@app/contracts/visits/visit.response'

export const VISITS_PATTERNS = {
  FIND_ALL: 'findAll',
  FIND_ONE: 'findOne',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
}

export interface VisitsGrpcService {
  findAll(props: VisitSingleProps): Observable<PaginatedVisitsResponse>
  create(data: CreateVisitDto): Observable<CreateVisitResponse>
  update(data: UpdateVisitDto): Observable<UpdateVisitResponse>
  delete({ id }: { id: string }): Observable<RemoveVisitResponse>
  findOne({ id }: { id: string }): Observable<Visit>
}
