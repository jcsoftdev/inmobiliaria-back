import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { VisitsService } from './visits.service'

describe('VisitsService', () => {
  let service: VisitsService

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
      providers: [VisitsService],
    }).compile()

    service = module.get<VisitsService>(VisitsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
