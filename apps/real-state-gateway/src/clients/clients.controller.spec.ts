import { Test, TestingModule } from '@nestjs/testing'
import { ClientsController } from './clients.controller'
import { ClientsService } from '@gateway/clients/clients.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

describe('ClientsController', () => {
  let controller: ClientsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      controllers: [ClientsController],
      providers: [ClientsService],
    }).compile()

    controller = module.get<ClientsController>(ClientsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
