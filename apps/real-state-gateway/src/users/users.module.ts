import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MANAGEMENT_CLIENT',
        transport: Transport.TCP,
        options: {
          port: +(process.env.AGENCIES_SERVICE_PORT ?? 3003),
        },
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
