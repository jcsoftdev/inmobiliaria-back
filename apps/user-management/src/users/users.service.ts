import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import {
  USERS_PATTERNS,
  User,
  UserProps,
  CreateUserResponse,
  PaginatedUsersResponse,
  RemoveUserResponse,
  UpdateUserResponse,
  AddAgenciesResponse,
  RemoveAgenciesResponse,
} from '@app/contracts/users'

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly usersClient: ClientProxy,
  ) {}

  findAll(props: UserProps): Promise<PaginatedUsersResponse> {
    return firstValueFrom(
      this.usersClient.send<PaginatedUsersResponse, UserProps>(
        USERS_PATTERNS.FIND_ALL,
        props,
      ),
    )
  }

  create(data: User): Promise<CreateUserResponse> {
    return firstValueFrom(
      this.usersClient.send<CreateUserResponse>(USERS_PATTERNS.CREATE, data),
    )
  }

  findOne(id: string): Promise<User> {
    return firstValueFrom(
      this.usersClient.send<User>(USERS_PATTERNS.FIND_ONE, id),
    )
  }

  update(id: User): Promise<UpdateUserResponse> {
    return firstValueFrom(
      this.usersClient.send<UpdateUserResponse>(USERS_PATTERNS.UPDATE, id),
    )
  }

  remove(id: string): Promise<RemoveUserResponse> {
    return firstValueFrom(
      this.usersClient.send<RemoveUserResponse>(USERS_PATTERNS.REMOVE, id),
    )
  }

  addAgencies(
    userId: string,
    agencyIds: string[],
  ): Promise<AddAgenciesResponse> {
    return firstValueFrom(
      this.usersClient.send<AddAgenciesResponse>(USERS_PATTERNS.ADD_AGENCY, {
        userId,
        agencyIds,
      }),
    )
  }

  removeAgencies(
    userId: string,
    agencyIds: string[],
  ): Promise<RemoveAgenciesResponse> {
    return firstValueFrom(
      this.usersClient.send<RemoveAgenciesResponse>(
        USERS_PATTERNS.REMOVE_AGENCY,
        {
          userId,
          agencyIds,
        },
      ),
    )
  }
}
