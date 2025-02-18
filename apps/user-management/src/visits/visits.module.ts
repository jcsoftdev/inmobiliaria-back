import { ClientsModule, Transport } from '@nestjs/microservices'
import { Module } from '@nestjs/common'
import { VisitsService } from './visits.service'
import { VisitsController } from './visits.controller'

@Module({
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
})
export class VisitsModule {}
