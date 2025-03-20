import { Injectable } from '@nestjs/common'
import { v7 as uuidV7 } from 'uuid'

import { paginator } from '@app/common/pagination'
import { CreateCompanyDto, UpdateCompanyDto } from '@app/contracts/companies'
import {
  Company,
  CompanyProps,
  PaginatedCompaniesResponse,
  CreateCompanyResponse,
  RemoveCompanyResponse,
  UpdateCompanyResponse,
} from '@app/contracts/companies/companies.response'

import { PrismaService } from '@data-service/prisma.service'

@Injectable()
export class CompaniesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({
    orderBy,
    where,
    ...props
  }: CompanyProps): Promise<PaginatedCompaniesResponse> {
    const results = await paginator.paginate(
      this.prismaService.companies,
      {
        orderBy,
        where,
        select: {
          id: true,
          name: true,
          address: true,
          services: true,
          email: true,
          phone: true,
          users: {
            select: {
              users: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
      props,
    )

    return {
      ...results,
      data: results.data.map(({ users, ...company }) => {
        return {
          ...company,
          users: users?.map((a) => a.users.id) || [],
        }
      }),
    }
  }

  async create(
    createCompanyDto: CreateCompanyDto,
  ): Promise<CreateCompanyResponse> {
    return this.prismaService.$transaction(async (prisma) => {
      await prisma.companies.create({
        data: {
          id: uuidV7(),
          name: createCompanyDto.name,
          address: createCompanyDto.address,
          services: createCompanyDto.services,
          email: createCompanyDto.email,
          phone: createCompanyDto.phone,
        },
      })

      return { message: 'Company created successfully' }
    })
  }

  async findOne(id: string): Promise<Company> {
    const result = await this.prismaService.companies.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        address: true,
        services: true,
        email: true,
        phone: true,
        users: {
          select: {
            users: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })

    return {
      ...result,
      users: result.users?.map((a) => a.users.id) || [],
    }
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<UpdateCompanyResponse> {
    try {
      await this.prismaService.companies.update({
        where: { id },
        data: {
          ...updateCompanyDto,
        },
      })

      return {
        message: 'Company updated successfully',
      }
    } catch (err) {
      console.log(err)
      return {
        message: 'Error updatong user',
      }
    }
  }

  async remove(id: string): Promise<RemoveCompanyResponse> {
    await this.prismaService.companies.delete({
      where: { id: id },
    })

    return {
      message: 'Company deleted successfully',
    }
  }

  async addUserToCompany(companyId: string, userIds: string[]) {
    try {
      await this.prismaService.users_companies.createMany({
        data: userIds.map((userId) => ({
          id: uuidV7(),
          company_id: companyId,
          user_id: userId,
        })),
      })
    } catch (error) {
      console.error('Error en addUserToCompany', error)
    }
  }

  async removeUserFromCompany(
    companyId: string,
    userIds: string[],
  ): Promise<UpdateCompanyResponse> {
    await this.prismaService.users_companies.deleteMany({
      where: {
        company_id: companyId,
        user_id: {
          in: userIds,
        },
      },
    })

    return {
      message: 'User removed from company successfully',
    }
  }
}
