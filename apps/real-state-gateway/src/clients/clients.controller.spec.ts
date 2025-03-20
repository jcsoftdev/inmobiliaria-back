import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { ClientsService } from '@gateway/clients/clients.service'

import { ClientsController } from './clients.controller'

describe('ClientsController', () => {
  let controller: ClientsController

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
      controllers: [ClientsController],
      providers: [ClientsService],
    }).compile()

    controller = module.get<ClientsController>(ClientsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
