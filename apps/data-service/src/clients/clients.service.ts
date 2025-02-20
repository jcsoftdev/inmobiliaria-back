import { PrismaService } from '@data-service/prisma.service'
import { Injectable } from '@nestjs/common'

import { CreateClientDto, UpdateClientDto } from '@app/contracts/clients'
import {
  Client,
  CreationClient,
  RemoveClient,
  UpdateClient,
} from '@app/contracts/clients/clients.response'

@Injectable()
export class ClientsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<CreationClient> {
    await this.prismaService.clients.create({
      data: {
        name: createClientDto.name,
        email: createClientDto.email,
        phone: createClientDto.phone,
        created_at: new Date(),
      },
    })

    return {
      message: 'Client created successfully',
    }
  }

  findAll(): Promise<Client[]> {
    return this.prismaService.clients.findMany()
  }

  findOne(id: number): Promise<Client> {
    return this.prismaService.clients.findUniqueOrThrow({ where: { id } })
  }

  update(id: number, updateClientDto: UpdateClientDto): Promise<UpdateClient> {
    return this.prismaService.clients.update({
      where: { id },
      data: {
        name: updateClientDto.name,
        phone: updateClientDto.phone,
        email: updateClientDto.email,
      },
    })
  }

  async remove(id: number): Promise<RemoveClient> {
    await this.prismaService.clients.delete({
      where: { id: Number(id) }, // Convertimos a número por si acaso
    })
    return {
      message: 'Client removed successfully',
    }
  }
}
