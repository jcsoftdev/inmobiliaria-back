import { USERS_PATTERNS, User } from '@app/contracts/users'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MANAGEMENT_CLIENT')
    private readonly userManagementClient: ClientProxy,
  ) {}

  findAll(): Observable<User[]> {
    return this.userManagementClient.send<User[]>(USERS_PATTERNS.FIND_ALL, {})
  }

  create(data: User): Observable<User> {
    return this.userManagementClient.send<User>(USERS_PATTERNS.CREATE, data)
  }
}
