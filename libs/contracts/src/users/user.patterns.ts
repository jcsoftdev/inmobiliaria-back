import { Observable } from 'rxjs'

import { CreateUserDto } from '@app/contracts/users/create-user.dto'
import { UpdateUserDto } from '@app/contracts/users/update-user.dto'
import {
  AddAgenciesResponse,
  CreateUserResponse,
  PaginatedUsersResponse,
  RemoveAgenciesResponse,
  RemoveUserResponse,
  UpdateUserResponse,
  User,
  UserSingleProps,
} from '@app/contracts/users/user.response'

export const USERS_PATTERNS = {
  FIND_ALL: 'findAll',
  FIND_ONE: 'findOne',
  CREATE: 'create',
  UPDATE: 'update',
  REMOVE: 'remove',
  ADD_AGENCY: 'addAgency',
  REMOVE_AGENCY: 'removeAgency',
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
