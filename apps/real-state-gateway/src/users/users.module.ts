import { join } from 'path'

import { AuthModule } from '@libs/auth'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

const protoPath = join(__dirname, '../../../libs/common/src/protos/users.proto')
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MANAGEMENT_CLIENT',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: protoPath,
        },
      },
    ]),
    AuthModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
