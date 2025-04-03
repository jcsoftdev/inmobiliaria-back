import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { v7 as uuidV7 } from 'uuid'

import { paginator } from '@app/common/pagination'
import {
  Agency,
  AgencySingleProps,
  CreateAgencyDto,
  CreateAgencyResponse,
  PaginatedAgenciesResponse,
  RemoveAgencyResponse,
  UpdateAgencyDto,
  UpdateAgencyResponse,
} from '@app/contracts/agencies'

import { PrismaService } from '@data-service/prisma.service'

@Injectable()
export class AgenciesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({
    search,
    ...props
  }: AgencySingleProps): Promise<PaginatedAgenciesResponse> {
    const searchWhere: Prisma.agenciesWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            {
              address: { contains: search, mode: Prisma.QueryMode.insensitive },
            },
            { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { phone: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { ruc: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {}

    const results = await paginator.paginate(
      this.prismaService.agencies,
      {
        where: searchWhere,
        select: {
          id: true,
          name: true,
          address: true,
          phone: true,
          email: true,
          ruc: true,
          created_at: true,
        },
      },
      props,
    )

    return {
      ...results,
      data: results.data.map((agency) => ({
        ...agency,
        email: agency.email ?? '',
        ruc: agency.ruc ?? '',
      })),
    }
  }

  async create(
    createAgencyDto: CreateAgencyDto,
  ): Promise<CreateAgencyResponse> {
    await this.prismaService.agencies.create({
      data: {
        id: uuidV7(),
        name: createAgencyDto.name,
        address: createAgencyDto.address,
        phone: createAgencyDto.phone,
        email: createAgencyDto.email,
        ruc: createAgencyDto.ruc,
        created_at: new Date(),
      },
    })
    return {
      message: 'Agency created successfully',
    }
  }

  findOne({ id }: { id: string }): Promise<Agency> {
    return this.prismaService.agencies
      .findUniqueOrThrow({ where: { id } })
      .then((agency) => ({
        ...agency,
        email: agency.email ?? '',
        ruc: agency.ruc ?? '',
      }))
  }

  async update({
    id,
    ...updateAgencyDto
  }: UpdateAgencyDto): Promise<UpdateAgencyResponse> {
    await this.prismaService.agencies.update({
      where: { id },
      data: {
        name: updateAgencyDto.name,
        address: updateAgencyDto.address,
        phone: updateAgencyDto.phone,
        email: updateAgencyDto.email,
        ruc: updateAgencyDto.ruc,
      },
    })

    return {
      message: 'Agency updated successfully',
    }
  }

  async delete({ id }: { id: string }): Promise<RemoveAgencyResponse> {
    await this.prismaService.agencies.delete({
      where: { id },
    })
    return {
      message: 'Agency removed successfully',
    }
  }
}
