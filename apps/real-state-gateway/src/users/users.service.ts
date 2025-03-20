import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
import { firstValueFrom, Observable } from 'rxjs'

import { PaginateOptions } from '@app/common/pagination'
import {
  PaginatedUsersResponse,
  CreateUserResponse,
  RemoveUserResponse,
  UpdateUserResponse,
  CreateUserDto,
  UpdateUserAgencyDto,
  UserSingleProps,
  UpdateUserDto,
} from '@app/contracts/users'

interface UsersGrpcService {
  findAll(props: UserSingleProps): Observable<PaginatedUsersResponse>
  create(data: CreateUserDto): Observable<CreateUserResponse>
  update(request: {
    id: string
    data: Partial<UpdateUserDto>
  }): Observable<UpdateUserResponse>
  delete(request: { id: string }): Observable<RemoveUserResponse>
  addAgency(request: {
    userId: string
    agencyIds: string[]
  }): Observable<UpdateUserResponse>
  removeAgency(request: {
    userId: string
    agencyIds: string[]
  }): Observable<UpdateUserResponse>
}

@Injectable()
export class UsersService {
  private usersService!: UsersGrpcService

  constructor(
    @Inject('USER_MANAGEMENT_CLIENT')
    private readonly userManagementClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.usersService =
      this.userManagementClient.getService<UsersGrpcService>('UserService')
  }

  findAll(props: PaginateOptions): Promise<PaginatedUsersResponse> {
    return firstValueFrom(
      // this.userManagementClient.send<PaginatedUsersResponse, PaginateOptions>(
      //   USERS_PATTERNS.FIND_ALL,
      //   props,
      // ),
      this.usersService.findAll(props),
    )
  }

  create(data: CreateUserDto): Promise<CreateUserResponse> {
    return firstValueFrom(
      // this.userManagementClient.send<CreateUserResponse>(
      //   USERS_PATTERNS.CREATE,
      //   data,
      // ),
      this.usersService.create(data),
    )
  }

  update(
    id: string,
    data: Partial<UpdateUserDto>,
  ): Promise<UpdateUserResponse> {
    return firstValueFrom(
      // this.userManagementClient.send<UpdateUserResponse>(
      //   USERS_PATTERNS.UPDATE,
      //   {
      //     id,
      //     data,
      //   },
      // ),
      this.usersService.update({ id, data }),
    )
  }

  delete(id: string): Promise<RemoveUserResponse> {
    return firstValueFrom(
      // this.userManagementClient.send<RemoveUserResponse>(
      //   USERS_PATTERNS.REMOVE,
      //   {
      //     id,
      //   },
      // ),
      this.usersService.delete({ id }),
    )
  }

  addAgencyToUser(
    userId: string,
    agencyId: string[],
  ): Promise<UpdateUserResponse> {
    return firstValueFrom(
      // this.userManagementClient.send<UpdateUserResponse, UpdateUserAgencyDto>(
      //   USERS_PATTERNS.ADD_AGENCY,
      //   { userId, agencyIds: agencyId },
      // ),
      this.usersService.addAgency({ userId, agencyIds: agencyId }),
    )
  }

  removeAgencyFromUser(
    userId: string,
    agencyIds: string[],
  ): Promise<UpdateUserResponse> {
    return firstValueFrom(
      // this.userManagementClient.send<UpdateUserResponse, UpdateUserAgencyDto>(
      //   USERS_PATTERNS.REMOVE_AGENCY,
      //   { userId, agencyIds },
      // ),
      this.usersService.removeAgency({ userId, agencyIds }),
    )
  }
}
