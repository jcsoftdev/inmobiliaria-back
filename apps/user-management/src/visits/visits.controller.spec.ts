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
            name: 'DATABASE_SERVICE_CLIENT',
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
