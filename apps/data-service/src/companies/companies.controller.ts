import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import { PaginateOptions } from '@app/common/pagination'
import {
  COMPANIES_PATTERNS,
  CreateCompanyDto,
  UpdateCompanyDto,
  PaginatedCompaniesResponse,
  UpdateCompanyResponse,
} from '@app/contracts/companies'
import { SERVICES } from '@app/shared'

import { CompaniesService } from './companies.service'

@Controller()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.FIND_ALL)
  findAll(props: PaginateOptions): Promise<PaginatedCompaniesResponse> {
    return this.companiesService.findAll(props)
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.CREATE)
  create(@Payload() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto)
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.companiesService.findOne(id)
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.UPDATE)
  update(@Payload() { id, data }: { id: string; data: UpdateCompanyDto }) {
    return this.companiesService.update(id, data)
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.DELETE)
  delete(@Payload() payload: { id: string }) {
    return this.companiesService.remove(payload.id)
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.ADD_USER)
  async AddUser(
    @Payload()
    { companyId, userIds }: { companyId: string; userIds: string[] },
  ): Promise<UpdateCompanyResponse> {
    await this.companiesService.addUserToCompany(companyId, userIds)
    return { message: 'User added to company successfuly' }
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.REMOVE_USER)
  async removeUser(
    @Payload()
    { companyId, userIds }: { companyId: string; userIds: string[] },
  ): Promise<UpdateCompanyResponse> {
    await this.companiesService.removeUserFromCompany(companyId, userIds)
    return { message: 'User removed from company successfuly' }
  }
}
