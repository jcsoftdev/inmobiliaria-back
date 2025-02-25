import { Injectable } from '@nestjs/common'

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
    try {
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
            client_id: visit.client_id ?? 0,
            property_id: visit.property_id ?? 0,
            scheduled_at: visit.scheduled_at ?? new Date(),
            status: (visit.status ?? 'pending') as Visit['status'],
            created_at: visit.created_at ?? new Date(),
          }
        }),
      }
    } catch (error) {
      console.log('Error:', error)
      throw error
    }
  }

  async findOne(id: number): Promise<Visit> {
    const data = await this.prismaService.visits.findUniqueOrThrow({
      where: { id },
    })

    return {
      id: data.id,
      client_id: data.client_id ?? 0,
      property_id: data.property_id ?? 0,
      scheduled_at: data.scheduled_at ?? new Date(),
      status: (data.status ?? 'pending') as Visit['status'],
      created_at: data.created_at ?? new Date(),
    }
  }

  async update(
    id: number,
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

  async remove(id: number): Promise<RemoveVisitResponse> {
    await this.prismaService.visits.delete({
      where: { id: Number(id) }, // Convertimos a número por si acaso
    })
    return { message: 'Visit removed successfully' }
  }
}
