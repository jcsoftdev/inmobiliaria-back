import { Test, TestingModule } from '@nestjs/testing'
import { ClientsService } from './clients.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

describe('ClientsService', () => {
  let service: ClientsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      providers: [ClientsService],
    }).compile()

    service = module.get<ClientsService>(ClientsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
