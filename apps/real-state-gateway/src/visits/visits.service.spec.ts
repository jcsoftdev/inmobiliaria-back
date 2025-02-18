import { Test, TestingModule } from '@nestjs/testing'
import { VisitsService } from './visits.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

describe('VisitsService', () => {
  let service: VisitsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'USER_MANAGEMENT_CLIENT',
            transport: Transport.TCP,
            options: {
              port: +(process.env.VISITS_SERVICE_PORT ?? 3003),
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
