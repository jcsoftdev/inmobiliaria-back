import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { ClientsController } from './clients.controller'
import { ClientsService } from './clients.service'

describe('ClientsController', () => {
  let controller: ClientsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: MICRO_SERVICES.DATABASE_CLIENT,
            transport: Transport.TCP,
            options: {
              port: +(process.env.DATABASE_SERVICE_PORT ?? 3002),
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
