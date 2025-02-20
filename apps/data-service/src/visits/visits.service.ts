import {
  CreateVisitDto,
  UpdateVisitDto,
  Visit,
  VisitCreation,
} from '@app/contracts/visits'
import { PrismaService } from '@data-service/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class VisitsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVisitDto: CreateVisitDto): Promise<VisitCreation> {
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

  async findAll(): Promise<Visit[]> {
    const data = await this.prismaService.visits.findMany()

    return data.map((visit) => {
      return {
        id: visit.id,
        client_id: visit.client_id ?? 0,
        property_id: visit.property_id ?? 0,
        scheduled_at: visit.scheduled_at ?? new Date(),
        status: (visit.status ?? 'pending') as Visit['status'],
        created_at: visit.created_at ?? new Date(),
      }
    })
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

  update(id: number, updateVisitDto: UpdateVisitDto) {
    return this.prismaService.visits.update({
      where: { id },
      data: {
        client_id: updateVisitDto.clientId,
        property_id: updateVisitDto.propertyId,
        scheduled_at: updateVisitDto.scheduledAt,
        status: updateVisitDto.status,
      },
    })
  }

  remove(id: number) {
    return this.prismaService.visits.delete({
      where: { id: Number(id) }, // Convertimos a número por si acaso
    })
  }
}
