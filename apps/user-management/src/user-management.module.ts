import { Module } from '@nestjs/common'
import { UserManagementController } from './user-management.controller'
import { UserManagementService } from './user-management.service'
import { AgenciesModule } from './agencies/agencies.module'
import { ClientsModule } from './clients/clients.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [AgenciesModule, ClientsModule, UsersModule],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
