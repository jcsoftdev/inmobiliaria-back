import { Test, TestingModule } from '@nestjs/testing'
import { PropertiesController } from './properties.controller'
import { PropertiesService } from './properties.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

describe('PropertiesController', () => {
  let propertiesController: PropertiesController
  const mockPropertiesService = {
    findAll: jest.fn().mockReturnValue('Hello World!'),
  }
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'DATABASE_SERVICE_CLIENT',
            transport: Transport.TCP,
            options: {
              port: +(process.env.PROPERTIES_SERVICE_PORT ?? 3001),
            },
          },
        ]),
      ],
      controllers: [PropertiesController],
      providers: [
        {
          provide: PropertiesService,
          useValue: mockPropertiesService,
        },
      ],
    }).compile()

    propertiesController = app.get<PropertiesController>(PropertiesController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(propertiesController.findAll()).toBe('Hello World!')
    })
  })
})
