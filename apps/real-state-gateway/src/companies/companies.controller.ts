import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'

import {
  CreateCompanyDto,
  UpdateCompanyDto,
  UpdateCompanyUserDto,
} from '@app/contracts/companies'
import {
  Company,
  PaginatedCompaniesResponse,
  CreateCompanyResponse,
  RemoveCompanyResponse,
  UpdateCompanyResponse,
  CompanySingleProps,
} from '@app/contracts/companies/companies.response'

import { CompaniesService } from './companies.service'

@ApiTags('Empresas')
@Controller('companies')
@ApiExtraModels(PaginatedCompaniesResponse, Company)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all companies',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedCompaniesResponse) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Company) },
            },
          },
        },
      ],
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'perPage', required: false, type: Number })
  findAll(
    @Query() { ...props }: CompanySingleProps,
  ): Promise<PaginatedCompaniesResponse> {
    return this.companiesService.findAll(props)
  }

  @Post()
  @ApiOkResponse({
    description: 'Create a company',
    type: CreateCompanyResponse,
  })
  create(@Body() data: CreateCompanyDto): Promise<CreateCompanyResponse> {
    return this.companiesService.create(data)
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update a company',
    type: UpdateCompanyResponse,
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateCompanyDto,
  ): Promise<UpdateCompanyResponse> {
    return this.companiesService.update(id, data)
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Remove a company',
    type: RemoveCompanyResponse,
  })
  delete(@Param('id') id: string): Promise<RemoveCompanyResponse> {
    return this.companiesService.delete(id)
  }

  @Post(':id/add-users')
  @ApiResponse({
    status: 202,
    description: 'Add user to company',
    type: UpdateCompanyResponse,
  })
  addUser(
    @Param('id') companyId: string,
    @Body() data: UpdateCompanyUserDto,
  ): Promise<UpdateCompanyResponse> {
    return this.companiesService.addUserToCompany(companyId, data.userIds ?? [])
  }

  @Post(':id/remove-users')
  @ApiResponse({
    status: 202,
    description: 'Remove user from company',
    type: UpdateCompanyResponse,
  })
  removeUser(
    @Param('id') companyId: string,
    @Body() data: UpdateCompanyUserDto,
  ): Promise<UpdateCompanyResponse> {
    return this.companiesService.removeUserFromCompany(
      companyId,
      data.userIds ?? [],
    )
  }
}
