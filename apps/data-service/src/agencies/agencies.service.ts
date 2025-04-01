import { Injectable } from '@nestjs/common'
import { v7 as uuidV7 } from 'uuid'

import { paginator } from '@app/common/pagination'
import {
  Agency,
  AgencyProps,
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

  async findAll({
    q,
    orderBy,
    where = {},
    ...props
  }: { q?: string } & AgencyProps): Promise<PaginatedAgenciesResponse> {
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { ruc: { contains: q, mode: 'insensitive' } },
      ]
    }

    console.log('Search query:', q)
    console.log('Search filters:', where)

    const res = paginator.paginate(
      this.prismaService.agencies,
      {
        orderBy,
        where,
      },
      { ...props },
    )

    return res.then((result) => {
      console.log('Paginated results:', result)
      return {
        ...result,
        data: result.data.map((agency) => ({
          ...agency,
          email: agency.email ?? '',
          ruc: agency.ruc ?? '',
        })),
      }
    })
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
