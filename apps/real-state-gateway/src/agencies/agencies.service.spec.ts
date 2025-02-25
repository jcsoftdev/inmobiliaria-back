import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { AgenciesService } from './agencies.service'

describe('AgenciesService', () => {
  let service: AgenciesService

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
      providers: [AgenciesService],
    }).compile()

    service = module.get<AgenciesService>(AgenciesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
