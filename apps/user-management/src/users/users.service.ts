import { USERS_PATTERNS, User } from '@app/contracts/users'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATABASE_SERVICE_CLIENT')
    private readonly usersClient: ClientProxy,
  ) {}

  findAll(): Observable<User[]> {
    return this.usersClient.send<User[]>(USERS_PATTERNS.FIND_ALL, {})
  }

  create(data: User): Observable<User> {
    return this.usersClient.send<User>(USERS_PATTERNS.CREATE, data)
  }

  findOne(id: number): Observable<User> {
    return this.usersClient.send<User>(USERS_PATTERNS.FIND_ONE, id)
  }

  update(id: User): Observable<User> {
    return this.usersClient.send<User>(USERS_PATTERNS.UPDATE, id)
  }

  remove(id: number): Observable<User> {
    return this.usersClient.send<User>(USERS_PATTERNS.REMOVE, id)
  }
}
