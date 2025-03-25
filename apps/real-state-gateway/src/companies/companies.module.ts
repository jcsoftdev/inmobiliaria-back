import { join } from 'node:path'

import { AuthModule } from '@libs/auth'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { MICRO_SERVICES } from '@app/shared'

import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'

const protoPath = join(
  __dirname,
  '../../../libs/common/src/protos/companies.proto',
)

const port = process.env.USER_MANAGEMENT_SERVICE_PORT ?? ''

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.USER_MANAGEMENT_CLIENT,
        transport: Transport.GRPC,
        options: {
          package: 'companies',
          protoPath: protoPath,
          url: `0.0.0.0:${port}`,
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
