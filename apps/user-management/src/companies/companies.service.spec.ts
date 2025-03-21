import { join } from 'node:path'

import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { CompaniesService } from './companies.service'

const protoPath = join(
  __dirname,
  '../../../../libs/common/src/protos/companies.proto',
)

describe('CompaniesService', () => {
  let service: CompaniesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: MICRO_SERVICES.DATABASE_CLIENT,
            transport: Transport.GRPC,
            options: {
              package: 'companies',
              protoPath: protoPath,
              url: `0.0.0.0:${+(process.env.USER_MANAGEMENT_SERVICE_PORT ?? 50051)}`,
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
