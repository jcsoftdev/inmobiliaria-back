import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'
describe('CompaniesController', () => {
  let controller: CompaniesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: MICRO_SERVICES.USER_MANAGEMENT_CLIENT,
            transport: Transport.TCP,
            options: {
              port: +(process.env.AGENCIES_SERVICE_PORT ?? 3003),
            },
          },
        ]),
      ],
      controllers: [CompaniesController],
      providers: [CompaniesService],
    }).compile()

    controller = module.get<CompaniesController>(CompaniesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
