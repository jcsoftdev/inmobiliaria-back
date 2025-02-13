import { Test, TestingModule } from '@nestjs/testing'
import { AgenciesController } from './agencies.controller'
import { AgenciesService } from './agencies.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

describe('AgenciesController', () => {
  let controller: AgenciesController

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
      controllers: [AgenciesController],
      providers: [AgenciesService],
    }).compile()

    controller = module.get<AgenciesController>(AgenciesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
