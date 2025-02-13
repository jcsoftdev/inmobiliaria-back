import { PrismaService } from '@data-service/prisma.service'
import { Injectable } from '@nestjs/common'

import { CreateClientDto, UpdateClientDto } from '@app/contracts/clients'

@Injectable()
export class ClientsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createClientDto: CreateClientDto) {
    return this.prismaService.clients.create({
      data: {
        name: createClientDto.name,
        email: createClientDto.email,
        phone: createClientDto.phone,
        created_at: new Date(),
      },
    })
  }

  findAll() {
    return this.prismaService.clients.findMany()
  }

  findOne(id: number) {
    return this.prismaService.clients.findUniqueOrThrow({ where: { id } })
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.prismaService.clients.update({
      where: { id },
      data: {
        name: updateClientDto.name,
        phone: updateClientDto.phone,
        email: updateClientDto.email,
      },
    })
  }

  remove(id: number) {
    return this.prismaService.clients.delete({
      where: { id: Number(id) }, // Convertimos a número por si acaso
    })
  }
}
