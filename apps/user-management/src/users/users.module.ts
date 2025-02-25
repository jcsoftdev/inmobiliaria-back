import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DATABASE_SERVICE_CLIENT',
        transport: Transport.TCP,
        options: {
          port: +(process.env.DATABASE_SERVICE_PORT ?? 3002),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
