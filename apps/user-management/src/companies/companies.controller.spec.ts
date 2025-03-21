import { join } from 'node:path'

import { ClientsModule, Transport } from '@nestjs/microservices'
import { Test, TestingModule } from '@nestjs/testing'

import { MICRO_SERVICES } from '@app/shared'

import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'

const protoPath = join(
  __dirname,
  '../../../../libs/common/src/protos/companies.proto',
)

describe('CompaniesController', () => {
  let controller: CompaniesController

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
      controllers: [CompaniesController],
      providers: [CompaniesService],
    }).compile()

    controller = module.get<CompaniesController>(CompaniesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
