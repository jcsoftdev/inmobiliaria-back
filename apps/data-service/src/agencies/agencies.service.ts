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
        created_at: new Date(),
      },
    })
    return {
      message: 'Agency created successfully',
    }
  }

  findAll({
    orderBy,
    where,
    ...props
  }: AgencyProps): Promise<PaginatedAgenciesResponse> {
    const res = paginator.paginate(
      this.prismaService.agencies,
      {
        orderBy,
        where,
      },
      { ...props },
    )
    return res
  }

  findOne(id: string): Promise<Agency> {
    return this.prismaService.agencies.findUniqueOrThrow({ where: { id } })
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
      },
    })

    return {
      message: 'Agency updated successfully',
    }
  }

  async remove(id: string): Promise<RemoveAgencyResponse> {
    await this.prismaService.agencies.delete({
      where: { id },
    })
    return {
      message: 'Agency removed successfully',
    }
  }
}
