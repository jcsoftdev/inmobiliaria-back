import { AuthModule } from '@libs/auth'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { PropertiesService } from '@gateway/properties/properties.service'

import { PropertiesController } from './properties.controller'

describe('PropertiesController', () => {
  let propertiesController: PropertiesController

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
