import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpcProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'

import { DeleteClientBody } from '@app/contracts/clients'
import {
  Company,
  CompanyProps,
  PaginatedCompaniesResponse,
  CreateCompanyResponse,
  RemoveCompanyResponse,
  UpdateCompanyResponse,
  AddUsersResponse,
  RemoveUsersResponse,
  FindOneCompanyBody,
  AddUsersBody,
  CompaniesGrpcService,
  CreateCompanyDto,
  DeleteUsersBody,
  UpdateCompanyDto,
} from '@app/contracts/companies'
import { MICRO_SERVICES, SERVICES } from '@app/shared'

@Injectable()
export class CompaniesService {
  private companyService!: CompaniesGrpcService

  constructor(
    @Inject(MICRO_SERVICES.DATABASE_CLIENT)
    private readonly companiesClient: ClientGrpcProxy,
  ) {}

  onModuleInit() {
    this.companyService = this.companiesClient.getService<CompaniesGrpcService>(
      SERVICES.COMPANY,
    )
  }

  findAll(props: CompanyProps): Promise<PaginatedCompaniesResponse> {
    return firstValueFrom(this.companyService.findAll(props))
  }

  create(data: CreateCompanyDto): Promise<CreateCompanyResponse> {
    return firstValueFrom(this.companyService.create(data))
  }

  findOne({ id }: FindOneCompanyBody): Promise<Company> {
    return firstValueFrom(
      this.companyService.findOne({
        id,
      }),
    )
  }

  update(data: UpdateCompanyDto): Promise<UpdateCompanyResponse> {
    return firstValueFrom(this.companyService.update(data))
  }

  delete({ id }: DeleteClientBody): Promise<RemoveCompanyResponse> {
    return firstValueFrom(
      this.companyService.delete({
        id,
      }),
    )
  }

  addUsers(body: AddUsersBody): Promise<AddUsersResponse> {
    return firstValueFrom(this.companyService.addUsers(body))
  }

  removeUsers(body: DeleteUsersBody): Promise<RemoveUsersResponse> {
    return firstValueFrom(this.companyService.removeUsers(body))
  }
}
