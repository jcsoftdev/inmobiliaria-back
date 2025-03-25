import { join } from 'node:path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { MICRO_SERVICES } from '@app/shared'

import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'

const protoPath = join(
  __dirname,
  '../../../libs/common/src/protos/companies.proto',
)

const port = process.env.DATABASE_SERVICE_PORT ?? ''

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.DATABASE_CLIENT,
        transport: Transport.GRPC,
        options: {
          package: 'companies',
          protoPath: protoPath,
          url: `0.0.0.0:${port}`,
        },
      },
    ]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
