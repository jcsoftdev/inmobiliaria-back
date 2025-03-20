import { Injectable } from '@nestjs/common'
import { v7 as uuidV7 } from 'uuid'

import { paginator } from '@app/common/pagination'
import {
  CreateVisitDto,
  UpdateVisitDto,
  Visit,
  CreateVisitResponse,
  PaginatedVisitsResponse,
  VisitProps,
  UpdateVisitResponse,
  RemoveVisitResponse,
} from '@app/contracts/visits'

import { PrismaService } from '@data-service/prisma.service'

@Injectable()
export class VisitsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVisitDto: CreateVisitDto): Promise<CreateVisitResponse> {
    await this.prismaService.visits.create({
      data: {
        id: uuidV7(),
        client_id: createVisitDto.clientId,
        property_id: createVisitDto.propertyId,
        scheduled_at: createVisitDto.scheduledAt,
        status: createVisitDto.status,
        created_at: new Date(),
      },
    })

    return { message: 'Visit created successfully' }
  }

  async findAll({
    orderBy,
    where,
    ...props
  }: VisitProps): Promise<PaginatedVisitsResponse> {
    const data = await paginator.paginate(
      this.prismaService.visits,
      {
        orderBy,
        where,
      },
      {
        page: props.page,
        perPage: props.perPage,
      },
    )

    return {
      ...data,
      data: data.data.map((visit): Visit => {
        return {
          id: visit.id,
          client_id: visit.client_id,
          property_id: visit.property_id ?? '',
          scheduled_at: visit.scheduled_at ?? new Date(),
          status: (visit.status ?? 'pending') as Visit['status'],
          created_at: visit.created_at ?? new Date(),
        }
      }),
    }
  }

  async findOne({ id }: { id: string }): Promise<Visit> {
    const data = await this.prismaService.visits.findUniqueOrThrow({
      where: { id },
    })

    return {
      id: data.id,
      client_id: data.client_id ?? null,
      property_id: data.property_id ?? '', // change in database to be null
      scheduled_at: data.scheduled_at ?? new Date(),
      status: (data.status ?? 'pending') as Visit['status'],
      created_at: data.created_at ?? new Date(),
    }
  }

  async update(
    id: string,
    updateVisitDto: UpdateVisitDto,
  ): Promise<UpdateVisitResponse> {
    await this.prismaService.visits.update({
      where: { id },
      data: {
        client_id: updateVisitDto.clientId,
        property_id: updateVisitDto.propertyId,
        scheduled_at: updateVisitDto.scheduledAt,
        status: updateVisitDto.status,
      },
    })
    return { message: 'Visit updated successfully' }
  }

  async delete({ id }: { id: string }): Promise<RemoveVisitResponse> {
    await this.prismaService.visits.delete({
      where: { id: id },
    })
    return { message: 'Visit removed successfully' }
  }
}
