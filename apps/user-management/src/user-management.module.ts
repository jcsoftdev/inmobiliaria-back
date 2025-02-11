import { Module } from '@nestjs/common'
import { UserManagementController } from './user-management.controller'
import { UserManagementService } from './user-management.service'
import { AgenciesModule } from './agencies/agencies.module'

@Module({
  imports: [AgenciesModule],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
