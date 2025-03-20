import { join } from 'node:path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { MICRO_SERVICES } from '@app/shared'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

const protoPath = join(__dirname, '../../../libs/common/src/protos/users.proto')

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.DATABASE_CLIENT,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: 'users',
          protoPath,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
