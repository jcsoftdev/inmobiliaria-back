import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { PaginateOptions } from '@app/common/pagination'
import {
  COMPANIES_PATTERNS,
  Company,
  CreateCompanyDto,
  UpdateCompanyUserDto,
} from '@app/contracts/companies'
import {
  PaginatedCompaniesResponse,
  CreateCompanyResponse,
  RemoveCompanyResponse,
  UpdateCompanyResponse,
} from '@app/contracts/companies'
import { MICRO_SERVICES } from '@app/shared'

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(MICRO_SERVICES.USER_MANAGEMENT_CLIENT)
    private userManagementClient: ClientProxy,
  ) {}

  findAll(props: PaginateOptions): Promise<PaginatedCompaniesResponse> {
    return firstValueFrom(
      this.userManagementClient.send<
        PaginatedCompaniesResponse,
        PaginateOptions
      >(COMPANIES_PATTERNS.FIND_ALL, props),
    )
  }

  create(data: CreateCompanyDto): Promise<CreateCompanyResponse> {
    return firstValueFrom(
      this.userManagementClient.send<CreateCompanyResponse>(
        COMPANIES_PATTERNS.CREATE,
        data,
      ),
    )
  }

  update(id: string, data: Partial<Company>): Promise<UpdateCompanyResponse> {
    return firstValueFrom(
      this.userManagementClient.send<UpdateCompanyResponse>(
        COMPANIES_PATTERNS.UPDATE,
        {
          id,
          data,
        },
      ),
    )
  }

  delete(id: string): Promise<RemoveCompanyResponse> {
    return firstValueFrom(
      this.userManagementClient.send<RemoveCompanyResponse>(
        COMPANIES_PATTERNS.REMOVE,
        {
          id,
        },
      ),
    )
  }

  addUserToCompany(
    companyId: string,
    userId: string[],
  ): Promise<UpdateCompanyResponse> {
    return firstValueFrom(
      this.userManagementClient.send<
        UpdateCompanyResponse,
        UpdateCompanyUserDto
      >(COMPANIES_PATTERNS.ADD_USER, { companyId, userIds: userId }),
    )
  }

  removeUserFromCompany(
    companyId: string,
    userIds: string[],
  ): Promise<UpdateCompanyResponse> {
    return firstValueFrom(
      this.userManagementClient.send<
        UpdateCompanyResponse,
        UpdateCompanyUserDto
      >(COMPANIES_PATTERNS.REMOVE_USER, { companyId, userIds }),
    )
  }
}
