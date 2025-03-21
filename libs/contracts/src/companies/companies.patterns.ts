import { Observable } from 'rxjs'

import {
  AddUsersResponse,
  Company,
  CompanySingleProps,
  CreateCompanyResponse,
  DeleteCompanyBody,
  FindOneCompanyBody,
  PaginatedCompaniesResponse,
  RemoveCompanyResponse,
  UpdateCompanyResponse,
  CreateCompanyDto,
  UpdateCompanyDto,
  RemoveUsersResponse,
  AddUsersBody,
  DeleteUsersBody,
} from '@app/contracts/companies'

export const COMPANIES_PATTERNS = {
  FIND_ALL: 'findAll',
  FIND_ONE: 'findOne',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  ADD_USER: 'addUser',
  REMOVE_USER: 'removeUser',
}

export interface CompaniesGrpcService {
  findAll(props: CompanySingleProps): Observable<PaginatedCompaniesResponse>
  create(data: CreateCompanyDto): Observable<CreateCompanyResponse>
  update(data: UpdateCompanyDto): Observable<UpdateCompanyResponse>
  delete(data: DeleteCompanyBody): Observable<RemoveCompanyResponse>
  findOne(data: FindOneCompanyBody): Observable<Company>
  addUsers(data: AddUsersBody): Observable<AddUsersResponse>
  removeUsers(data: DeleteUsersBody): Observable<RemoveUsersResponse>
}
