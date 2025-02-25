import { PrismaService } from '@data-service/prisma.service'
import { Injectable } from '@nestjs/common'

import { CreateClientDto, UpdateClientDto } from '@app/contracts/clients'
import {
  Client,
  ClientProps,
  PaginatedClientsResponse,
  CreateClientResponse,
  RemoveClientResponse,
  UpdateClientResponse,
} from '@app/contracts/clients/clients.response'
import { paginator } from '@app/common/pagination'

@Injectable()
export class ClientsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createClientDto: CreateClientDto,
  ): Promise<CreateClientResponse> {
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

  findAll(props: ClientProps): Promise<PaginatedClientsResponse> {
    return paginator.paginate(this.prismaService.clients, {}, { ...props })
  }

  findOne(id: number): Promise<Client> {
    return this.prismaService.clients.findUniqueOrThrow({ where: { id } })
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<UpdateClientResponse> {
    await this.prismaService.clients.update({
      where: { id },
      data: {
        name: updateClientDto.name,
        phone: updateClientDto.phone,
        email: updateClientDto.email,
      },
    })

    return {
      message: 'Client updated successfully',
    }
  }

  async remove(id: number): Promise<RemoveClientResponse> {
    await this.prismaService.clients.delete({
      where: { id: Number(id) }, // Convertimos a número por si acaso
    })
    return {
      message: 'Client removed successfully',
    }
  }
}
