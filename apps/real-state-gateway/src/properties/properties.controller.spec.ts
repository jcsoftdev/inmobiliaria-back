import { AuthModule } from '@libs/auth'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { PropertiesService } from '@gateway/properties/properties.service'

import { PropertiesController } from './properties.controller'

const protoPath = 'libs/common/src/protos/properties.proto'

describe('PropertiesController', () => {
  let propertiesController: PropertiesController

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
        AuthModule,
      ],
      controllers: [PropertiesController],
      providers: [PropertiesService],
    }).compile()

    propertiesController =
      module.get<PropertiesController>(PropertiesController)
  })

  it('should be defined', () => {
    expect(propertiesController).toBeDefined()
  })
})
