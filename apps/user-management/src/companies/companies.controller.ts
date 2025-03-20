import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import {
  AddUsersReponse,
  Company,
  CompanyProps,
  CreateCompanyResponse,
  PaginatedCompaniesResponse,
  RemoveCompanyResponse,
  UpdateCompanyResponse,
  COMPANIES_PATTERNS,
  UpdateCompanyUserDto,
  RemoveUsersReponse,
} from '@app/contracts/companies'

import { CompaniesService } from './companies.service'

@Controller()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @MessagePattern(COMPANIES_PATTERNS.CREATE)
  create(@Payload() createCompanyDto: Company): Promise<CreateCompanyResponse> {
    return this.companiesService.create(createCompanyDto)
  }

  @MessagePattern(COMPANIES_PATTERNS.FIND_ALL)
  findAll(props: CompanyProps): Promise<PaginatedCompaniesResponse> {
    return this.companiesService.findAll(props)
  }

  @MessagePattern(COMPANIES_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string): Promise<Company> {
    return this.companiesService.findOne(id)
  }

  @MessagePattern(COMPANIES_PATTERNS.UPDATE)
  update(@Payload() updateCompanyDto: Company): Promise<UpdateCompanyResponse> {
    return this.companiesService.update(updateCompanyDto)
  }

  @MessagePattern(COMPANIES_PATTERNS.REMOVE)
  remove(@Payload() id: string): Promise<RemoveCompanyResponse> {
    return this.companiesService.remove(id)
  }

  @MessagePattern(COMPANIES_PATTERNS.ADD_USER)
  async addUsers(
    @Payload() payload: UpdateCompanyUserDto,
  ): Promise<AddUsersReponse> {
    if (
      !payload.companyId ||
      !payload.userIds ||
      payload.userIds.length === 0
    ) {
      throw new Error('companyId y userIds son requeridos')
    }
    return this.companiesService.addUsers(payload.companyId, payload.userIds)
  }

  @MessagePattern(COMPANIES_PATTERNS.REMOVE_USER)
  async removeUsers(
    @Payload() payload: UpdateCompanyUserDto,
  ): Promise<RemoveUsersReponse> {
    return this.companiesService.removeUsers(
      payload.companyId,
      payload.userIds ?? [],
    )
  }
}
