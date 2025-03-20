import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { UsersService } from '@gateway/users/users.service'

import { UsersController } from './users.controller'

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: MICRO_SERVICES.USER_MANAGEMENT_CLIENT,
            transport: Transport.TCP,
            options: {
              port: +(process.env.AGENCIES_SERVICE_PORT ?? 3003),
            },
          },
        ]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
