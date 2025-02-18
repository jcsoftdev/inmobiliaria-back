import { CreateVisitDto, UpdateVisitDto } from '@app/contracts/visits'
import { PrismaService } from '@data-service/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class VisitsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createVisitDto: CreateVisitDto) {
    return this.prismaService.visits.create({
      data: {
        client_id: createVisitDto.clientId,
        property_id: createVisitDto.propertyId,
        scheduled_at: createVisitDto.scheduledAt,
        status: createVisitDto.status,
        created_at: new Date(),
      },
    })
  }

  findAll() {
    return this.prismaService.visits.findMany()
  }

  findOne(id: number) {
    return this.prismaService.visits.findUniqueOrThrow({ where: { id } })
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
