import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { AgenciesService } from './agencies.service'

describe('AgenciesService', () => {
  let service: AgenciesService

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
      providers: [AgenciesService],
    }).compile()

    service = module.get<AgenciesService>(AgenciesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
