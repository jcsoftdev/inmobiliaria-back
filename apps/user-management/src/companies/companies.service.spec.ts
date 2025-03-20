import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { CompaniesService } from '@gateway/companies/companies.service'

describe('CompaniesService', () => {
  let service: CompaniesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: MICRO_SERVICES.USER_MANAGEMENT_CLIENT,
            transport: Transport.TCP,
            options: {
              port: +(process.env.DATABASE_SERVICE_PORT ?? 3002),
            },
          },
        ]),
      ],
      providers: [CompaniesService],
    }).compile()

    service = module.get<CompaniesService>(CompaniesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
