import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { AgenciesService } from '@gateway/agencies/agencies.service'

import { AgenciesController } from './agencies.controller'

describe('AgenciesController', () => {
  let controller: AgenciesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'USER_MANAGEMENT_CLIENT',
            transport: Transport.TCP,
            options: {
              port: +(process.env.AGENCIES_SERVICE_PORT ?? 3003),
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
