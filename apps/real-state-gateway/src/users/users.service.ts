import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { PaginateOptions } from '@app/common/pagination'
import {
  PaginatedUsersResponse,
  CreateUserResponse,
  RemoveUserResponse,
  UpdateUserResponse,
  CreateUserDto,
  UpdateUserDto,
  UsersGrpcService,
} from '@app/contracts/users'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

@Injectable()
export class UsersService {
  private usersService!: UsersGrpcService

  constructor(
    @Inject(MICRO_SERVICES.USER_MANAGEMENT_CLIENT)
    private readonly userManagementClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.usersService = this.userManagementClient.getService<UsersGrpcService>(
      SERVICES.USER,
    )
  }

  findAll(props: PaginateOptions): Promise<PaginatedUsersResponse> {
    return firstValueFrom(this.usersService.findAll(props))
  }

  create(data: CreateUserDto): Promise<CreateUserResponse> {
    return firstValueFrom(this.usersService.create(data))
  }

  update(data: UpdateUserDto): Promise<UpdateUserResponse> {
    return firstValueFrom(this.usersService.update(data))
  }

  remove(id: string): Promise<RemoveUserResponse> {
    return firstValueFrom(this.usersService.remove(id))
  }

  addAgencyToUser(
    userId: string,
    agencyId: string[],
  ): Promise<UpdateUserResponse> {
    return firstValueFrom(
      this.usersService.addAgency({ userId, agencyIds: agencyId }),
    )
  }

  removeAgencyFromUser(
    userId: string,
    agencyIds: string[],
  ): Promise<UpdateUserResponse> {
    return firstValueFrom(this.usersService.removeAgency({ userId, agencyIds }))
  }
}
