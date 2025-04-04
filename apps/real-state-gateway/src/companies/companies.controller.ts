import { JwtAuthGuard } from '@libs/auth'
import { JwtPayload } from '@libs/auth'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'

import {
  AddUsersBody,
  CreateCompanyDto,
  DeleteUsersBody,
  UpdateCompanyDto,
} from '@app/contracts/companies'
import {
  Company,
  PaginatedCompaniesResponse,
  CreateCompanyResponse,
  RemoveCompanyResponse,
  UpdateCompanyResponse,
  CompanySingleProps,
} from '@app/contracts/companies/companies.response'

import { ACCESS_TOKEN_SWAGGER } from '@gateway/constants'

import { CompaniesService } from './companies.service'

@ApiTags('Empresas')
@Controller('companies')
@ApiExtraModels(PaginatedCompaniesResponse, Company)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(ACCESS_TOKEN_SWAGGER)
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
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description:
      'Search companies by name, address, services, email or phone (case insensitive)',
  })
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
  create(
    @Request() req: { user: JwtPayload },
    @Body() data: CreateCompanyDto,
  ): Promise<CreateCompanyResponse> {
    return this.companiesService.create({
      ...data,
      userIds: [req.user.sub],
    })
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
    return this.companiesService.update({
      ...data,
      id,
    })
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
    status: 200,
    description: 'Add user to company',
    type: UpdateCompanyResponse,
  })
  addUsers(
    @Param('id') companyId: string,
    @Body() data: AddUsersBody,
  ): Promise<UpdateCompanyResponse> {
    return this.companiesService.addUsersToCompany({
      ...data,
      companyId,
    })
  }

  @Post(':id/remove-users')
  @ApiResponse({
    status: 200,
    description: 'Remove user from company',
    type: UpdateCompanyResponse,
  })
  removeUser(
    @Param('id') companyId: string,
    @Body() data: DeleteUsersBody,
  ): Promise<UpdateCompanyResponse> {
    return this.companiesService.removeUserFromCompany({
      ...data,
      companyId,
    })
  }
}
