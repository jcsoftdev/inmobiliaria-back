import { Test, TestingModule } from '@nestjs/testing'
import { VisitsController } from './visits.controller'
import { VisitsService } from './visits.service'
import { ClientsModule, Transport } from '@nestjs/microservices'

describe('VisitsController', () => {
  let controller: VisitsController

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
      controllers: [VisitsController],
      providers: [VisitsService],
    }).compile()

    controller = module.get<VisitsController>(VisitsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
