import { join } from 'path'

import { AuthModule } from '@libs/auth'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { MICRO_SERVICES } from '@app/shared'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

const protoPath = join(__dirname, '../../../libs/common/src/protos/users.proto')

const port = process.env.USER_MANAGEMENT_SERVICE_PORT ?? ''

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.USER_MANAGEMENT_CLIENT,
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: protoPath,
          url: `0.0.0.0:${port}`,
        },
      },
    ]),
    AuthModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
