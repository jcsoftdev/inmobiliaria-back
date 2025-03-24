import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { PaginateOptions } from '@app/common/pagination'
import {
  CreateCompanyDto,
  PaginatedCompaniesResponse,
  CreateCompanyResponse,
  RemoveCompanyResponse,
  UpdateCompanyResponse,
  CompaniesGrpcService,
  UpdateCompanyDto,
  AddUsersBody,
  DeleteUsersBody,
} from '@app/contracts/companies'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

@Injectable()
export class CompaniesService {
  private companiesService!: CompaniesGrpcService

  constructor(
    @Inject(MICRO_SERVICES.USER_MANAGEMENT_CLIENT)
    private readonly userManagementClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.companiesService =
      this.userManagementClient.getService<CompaniesGrpcService>(
        SERVICES.COMPANY,
      )
  }

  async findAll(props: PaginateOptions): Promise<PaginatedCompaniesResponse> {
    return await firstValueFrom(this.companiesService.findAll(props)).then(
      (res) => {
        return { ...res, data: res.data ?? [] }
      },
    )
  }

  create(data: CreateCompanyDto): Promise<CreateCompanyResponse> {
    return firstValueFrom(this.companiesService.create(data))
  }

  update(data: UpdateCompanyDto): Promise<UpdateCompanyResponse> {
    return firstValueFrom(this.companiesService.update({ ...data }))
  }

  delete(id: string): Promise<RemoveCompanyResponse> {
    return firstValueFrom(this.companiesService.delete({ id }))
  }

  addUsersToCompany(data: AddUsersBody): Promise<UpdateCompanyResponse> {
    return firstValueFrom(this.companiesService.addUsers(data))
  }

  removeUserFromCompany(data: DeleteUsersBody): Promise<UpdateCompanyResponse> {
    return firstValueFrom(this.companiesService.removeUsers(data))
  }
}
