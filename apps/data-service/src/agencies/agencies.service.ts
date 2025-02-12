import { PrismaService } from '@data-service/prisma.service'
import { Injectable } from '@nestjs/common'

import { CreateAgencyDto, UpdateAgencyDto } from '@app/contracts/agencies'

@Injectable()
export class AgenciesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAgencyDto: CreateAgencyDto) {
    return this.prismaService.agencies.create({
      data: {
        name: createAgencyDto.name,
        address: createAgencyDto.address,
        phone: createAgencyDto.phone,
        email: createAgencyDto.email,
        created_at: new Date(),
      },
    })
  }

  findAll() {
    return this.prismaService.agencies.findMany()
  }

  findOne(id: number) {
    return this.prismaService.agencies.findUniqueOrThrow({ where: { id } })
  }

  update(id: number, updateAgencyDto: UpdateAgencyDto) {
    return this.prismaService.agencies.update({
      where: { id },
      data: {
        name: updateAgencyDto.name,
        address: updateAgencyDto.address,
        phone: updateAgencyDto.phone,
        email: updateAgencyDto.email,
      },
    })
  }

  remove(id: number) {
    return this.prismaService.agencies.delete({ where: { id } })
  }
}
