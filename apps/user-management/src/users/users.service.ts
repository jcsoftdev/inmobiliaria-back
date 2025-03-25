import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import {
  User,
  UserProps,
  CreateUserResponse,
  PaginatedUsersResponse,
  RemoveUserResponse,
  UpdateUserResponse,
  AddAgenciesResponse,
  RemoveAgenciesResponse,
  CreateUserDto,
  UpdateUserDto,
  UsersGrpcService,
} from '@app/contracts/users'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

@Injectable()
export class UsersService {
  private usersService!: UsersGrpcService

  constructor(
    @Inject(MICRO_SERVICES.DATABASE_CLIENT)
    private readonly usersClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.usersService = this.usersClient.getService<UsersGrpcService>(
      SERVICES.USER,
    )
  }

  async findAll(props: UserProps): Promise<PaginatedUsersResponse> {
    const data = await firstValueFrom(this.usersService.findAll(props))

    console.log(data)
    return data
  }

  create(data: CreateUserDto): Promise<CreateUserResponse> {
    return firstValueFrom(this.usersService.create(data))
  }

  findOne({ id }: { id: string }): Promise<User> {
    return firstValueFrom(this.usersService.findOne({ id }))
  }

  update(data: UpdateUserDto): Promise<UpdateUserResponse> {
    return firstValueFrom(this.usersService.update(data))
  }

  delete({ id }: { id: string }): Promise<RemoveUserResponse> {
    return firstValueFrom(this.usersService.delete({ id }))
  }

  addAgencies(
    userId: string,
    agencyIds: string[],
  ): Promise<AddAgenciesResponse> {
    return firstValueFrom(
      this.usersService.addAgency({
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
      this.usersService.removeAgency({
        userId,
        agencyIds,
      }),
    )
  }
}
