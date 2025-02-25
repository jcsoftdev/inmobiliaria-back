import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { PropertiesService } from './properties.service'

describe('PropertiesService', () => {
  let service: PropertiesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'PROPERTIES_CLIENT',
            transport: Transport.TCP,
            options: {
              port: +(process.env.PROPERTIES_SERVICE_PORT ?? 3001),
            },
          },
        ]),
      ],
      providers: [PropertiesService],
    }).compile()

    service = module.get<PropertiesService>(PropertiesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
