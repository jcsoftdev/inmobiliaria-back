import { Controller } from '@nestjs/common'
import { GrpcMethod, Payload } from '@nestjs/microservices'

import { DeleteClientBody } from '@app/contracts/clients'
import {
  AddUsersResponse,
  Company,
  CompanyProps,
  CreateCompanyResponse,
  PaginatedCompaniesResponse,
  RemoveCompanyResponse,
  UpdateCompanyResponse,
  COMPANIES_PATTERNS,
  RemoveUsersResponse,
  CreateCompanyDto,
  FindOneCompanyBody,
  UpdateCompanyDto,
  DeleteUsersBody,
  AddUsersBody,
} from '@app/contracts/companies'
import { SERVICES } from '@app/shared'

import { CompaniesService } from './companies.service'

@Controller()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.CREATE)
  create(
    @Payload() createCompanyDto: CreateCompanyDto,
  ): Promise<CreateCompanyResponse> {
    return this.companiesService.create(createCompanyDto)
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.FIND_ALL)
  findAll(props: CompanyProps): Promise<PaginatedCompaniesResponse> {
    return this.companiesService.findAll(props)
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.FIND_ONE)
  findOne(@Payload() payload: FindOneCompanyBody): Promise<Company> {
    return this.companiesService.findOne(payload)
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.UPDATE)
  update(
    @Payload() updateCompanyDto: UpdateCompanyDto,
  ): Promise<UpdateCompanyResponse> {
    return this.companiesService.update(updateCompanyDto)
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.DELETE)
  delete(@Payload() payload: DeleteClientBody): Promise<RemoveCompanyResponse> {
    return this.companiesService.delete(payload)
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.ADD_USERS)
  async addUsers(@Payload() payload: AddUsersBody): Promise<AddUsersResponse> {
    if (
      !payload.companyId ||
      !payload.userIds ||
      payload.userIds.length === 0
    ) {
      throw new Error('companyId y userIds son requeridos')
    }
    return this.companiesService.addUsers({
      companyId: payload.companyId,
      userIds: payload.userIds,
    })
  }

  @GrpcMethod(SERVICES.COMPANY, COMPANIES_PATTERNS.REMOVE_USER)
  async removeUsers(
    @Payload() payload: DeleteUsersBody,
  ): Promise<RemoveUsersResponse> {
    return this.companiesService.removeUsers(payload)
  }
}
