import { PrismaService } from '@data-service/prisma.service'
import { Injectable } from '@nestjs/common'

import {
  Agency,
  CreateAgencyDto,
  CreateAgencyResponse,
  RemoveAgencyResponse,
  UpdateAgencyDto,
  UpdateAgencyResponse,
} from '@app/contracts/agencies'
import {
  PaginatedResult,
  PaginateOptions,
  paginator,
} from '@app/common/pagination'

@Injectable()
export class AgenciesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAgencyDto: CreateAgencyDto,
  ): Promise<CreateAgencyResponse> {
    await this.prismaService.agencies.create({
      data: {
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

  findAll(props: PaginateOptions): Promise<PaginatedResult<Agency>> {
    console.log({ props, a: 'XD' })
    return paginator.paginate(this.prismaService.agencies, {}, { ...props })
  }

  findOne(id: number): Promise<Agency> {
    return this.prismaService.agencies.findUniqueOrThrow({ where: { id } })
  }

  async update(
    id: number,
    updateAgencyDto: UpdateAgencyDto,
  ): Promise<UpdateAgencyResponse> {
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

  async remove(id: number): Promise<RemoveAgencyResponse> {
    await this.prismaService.agencies.delete({
      where: { id: Number(id) },
    })
    return {
      message: 'Agency removed successfully',
    }
  }
}
