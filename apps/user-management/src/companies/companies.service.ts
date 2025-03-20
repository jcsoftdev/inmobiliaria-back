import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { COMPANIES_PATTERNS } from '@app/contracts/companies'
import {
  Company,
  CompanyProps,
  PaginatedCompaniesResponse,
  CreateCompanyResponse,
  RemoveCompanyResponse,
  UpdateCompanyResponse,
  AddUsersReponse,
  RemoveUsersReponse,
} from '@app/contracts/companies/companies.response'
import { MICRO_SERVICES } from '@app/shared'

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(MICRO_SERVICES.DATABASE_CLIENT)
    private readonly companiesClient: ClientProxy,
  ) {}

  findAll(props: CompanyProps): Promise<PaginatedCompaniesResponse> {
    return firstValueFrom(
      this.companiesClient.send<PaginatedCompaniesResponse, CompanyProps>(
        COMPANIES_PATTERNS.FIND_ALL,
        props,
      ),
    )
  }

  create(data: Company): Promise<CreateCompanyResponse> {
    return firstValueFrom(
      this.companiesClient.send<CreateCompanyResponse>(
        COMPANIES_PATTERNS.CREATE,
        data,
      ),
    )
  }

  findOne(id: string): Promise<Company> {
    return firstValueFrom(
      this.companiesClient.send<Company>(COMPANIES_PATTERNS.FIND_ONE, id),
    )
  }

  update(id: Company): Promise<UpdateCompanyResponse> {
    return firstValueFrom(
      this.companiesClient.send<UpdateCompanyResponse>(
        COMPANIES_PATTERNS.UPDATE,
        id,
      ),
    )
  }

  remove(id: string): Promise<RemoveCompanyResponse> {
    return firstValueFrom(
      this.companiesClient.send<RemoveCompanyResponse>(
        COMPANIES_PATTERNS.REMOVE,
        id,
      ),
    )
  }

  addUsers(companyId: string, userIds: string[]): Promise<AddUsersReponse> {
    return firstValueFrom(
      this.companiesClient.send<AddUsersReponse>(COMPANIES_PATTERNS.ADD_USER, {
        companyId,
        userIds,
      }),
    )
  }

  removeUsers(
    companyId: string,
    userIds: string[],
  ): Promise<RemoveUsersReponse> {
    return firstValueFrom(
      this.companiesClient.send<RemoveUsersReponse>(
        COMPANIES_PATTERNS.REMOVE_USER,
        {
          companyId,
          userIds,
        },
      ),
    )
  }
}
