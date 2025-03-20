import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { PropertiesService } from './properties.service'

const protoPath = 'libs/common/src/protos/properties.proto'

describe('PropertiesService', () => {
  let service: PropertiesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: MICRO_SERVICES.PROPERTY_CLIENT,
            transport: Transport.GRPC,
            options: {
              package: 'properties',
              protoPath: protoPath,
              url: `0.0.0.0:${+(process.env.PROPERTIES_PORT ?? 50052)}`,
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
