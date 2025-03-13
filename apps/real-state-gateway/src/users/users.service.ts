import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { PaginateOptions } from '@app/common/pagination'
import {
  USERS_PATTERNS,
  PaginatedUsersResponse,
  User,
  CreateUserResponse,
  RemoveUserResponse,
  UpdateUserResponse,
  CreateUserDto,
  UpdateUserAgencyDto,
} from '@app/contracts/users'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MANAGEMENT_CLIENT')
    private readonly userManagementClient: ClientProxy,
  ) {}

  findAll(props: PaginateOptions): Promise<PaginatedUsersResponse> {
    return firstValueFrom(
      this.userManagementClient.send<PaginatedUsersResponse, PaginateOptions>(
        USERS_PATTERNS.FIND_ALL,
        props,
      ),
    )
  }

  create(data: CreateUserDto): Promise<CreateUserResponse> {
    return firstValueFrom(
      this.userManagementClient.send<CreateUserResponse>(
        USERS_PATTERNS.CREATE,
        data,
      ),
    )
  }

  update(id: string, data: Partial<User>): Promise<UpdateUserResponse> {
    return firstValueFrom(
      this.userManagementClient.send<UpdateUserResponse>(
        USERS_PATTERNS.UPDATE,
        {
          id,
          data,
        },
      ),
    )
  }

  delete(id: string): Promise<RemoveUserResponse> {
    return firstValueFrom(
      this.userManagementClient.send<RemoveUserResponse>(
        USERS_PATTERNS.REMOVE,
        {
          id,
        },
      ),
    )
  }

  addAgencyToUser(
    userId: string,
    agencyId: string[],
  ): Promise<UpdateUserResponse> {
    return firstValueFrom(
      this.userManagementClient.send<UpdateUserResponse, UpdateUserAgencyDto>(
        USERS_PATTERNS.ADD_AGENCY,
        { userId, agencyIds: agencyId },
      ),
    )
  }

  removeAgencyFromUser(
    userId: string,
    agencyIds: string[],
  ): Promise<UpdateUserResponse> {
    return firstValueFrom(
      this.userManagementClient.send<UpdateUserResponse, UpdateUserAgencyDto>(
        USERS_PATTERNS.REMOVE_AGENCY,
        { userId, agencyIds },
      ),
    )
  }
}
