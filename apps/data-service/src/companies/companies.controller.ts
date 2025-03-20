import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { PaginateOptions } from '@app/common/pagination'
import {
  COMPANIES_PATTERNS,
  CreateCompanyDto,
  UpdateCompanyDto,
  PaginatedCompaniesResponse,
  UpdateCompanyResponse,
} from '@app/contracts/companies'

import { CompaniesService } from './companies.service'

@Controller()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @MessagePattern(COMPANIES_PATTERNS.FIND_ALL)
  findAll(props: PaginateOptions): Promise<PaginatedCompaniesResponse> {
    return this.companiesService.findAll(props)
  }

  @MessagePattern(COMPANIES_PATTERNS.CREATE)
  create(@Payload() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto)
  }

  @MessagePattern(COMPANIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.companiesService.findOne(id)
  }

  @MessagePattern(COMPANIES_PATTERNS.UPDATE)
  update(@Payload() { id, data }: { id: string; data: UpdateCompanyDto }) {
    return this.companiesService.update(id, data)
  }

  @MessagePattern(COMPANIES_PATTERNS.REMOVE)
  delete(@Payload() payload: { id: string }) {
    return this.companiesService.remove(payload.id)
  }

  @MessagePattern(COMPANIES_PATTERNS.ADD_USER)
  async AddUser(
    @Payload()
    { companyId, userIds }: { companyId: string; userIds: string[] },
  ): Promise<UpdateCompanyResponse> {
    await this.companiesService.addUserToCompany(companyId, userIds)
    return { message: 'User added to company successfuly' }
  }

  @MessagePattern(COMPANIES_PATTERNS.REMOVE_USER)
  async removeUser(
    @Payload()
    { companyId, userIds }: { companyId: string; userIds: string[] },
  ): Promise<UpdateCompanyResponse> {
    await this.companiesService.removeUserFromCompany(companyId, userIds)
    return { message: 'User removed from company successfuly' }
  }
}
