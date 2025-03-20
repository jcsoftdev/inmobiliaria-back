import { Module } from '@nestjs/common'

import { SharedConfigModule } from '@app/config'

import { AgenciesModule } from './agencies/agencies.module'
import { ClientsModule } from './clients/clients.module'
import { UserManagementController } from './user-management.controller'
import { UserManagementService } from './user-management.service'
import { UsersModule } from './users/users.module'
import { VisitsModule } from './visits/visits.module'

@Module({
  imports: [
    AgenciesModule,
    ClientsModule,
    UsersModule,
    VisitsModule,
    SharedConfigModule,
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
