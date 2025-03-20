import { Observable } from 'rxjs'

import {
  AddAgenciesResponse,
  CreateUserDto,
  CreateUserResponse,
  PaginatedUsersResponse,
  RemoveAgenciesResponse,
  RemoveUserResponse,
  UpdateUserDto,
  UpdateUserResponse,
  User,
  UserSingleProps,
} from '@app/contracts/users'

export const AGENCIES_PATTERNS = {
  FIND_ALL: 'findAll',
  FIND_ONE: 'findOne',
  CREATE: 'create',
  UPDATE: 'update',
  REMOVE: 'remove',
}

export interface UsersGrpcService {
  findAll(props: UserSingleProps): Observable<PaginatedUsersResponse>
  create(data: CreateUserDto): Observable<CreateUserResponse>
  update(data: UpdateUserDto): Observable<UpdateUserResponse>
  remove(id: string): Observable<RemoveUserResponse>
  findOne(id: string): Observable<User>
  addAgency(request: {
    userId: string
    agencyIds: string[]
  }): Observable<AddAgenciesResponse>
  removeAgency(request: {
    userId: string
    agencyIds: string[]
  }): Observable<RemoveAgenciesResponse>
}
