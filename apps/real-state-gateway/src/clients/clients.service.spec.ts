import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { ClientsService } from './clients.service'

describe('ClientsService', () => {
  let service: ClientsService

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
      providers: [ClientsService],
    }).compile()

    service = module.get<ClientsService>(ClientsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
