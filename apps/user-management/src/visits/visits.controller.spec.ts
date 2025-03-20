import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { VisitsController } from './visits.controller'
import { VisitsService } from './visits.service'

describe('VisitsController', () => {
  let controller: VisitsController

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
      controllers: [VisitsController],
      providers: [VisitsService],
    }).compile()

    controller = module.get<VisitsController>(VisitsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
