import { Injectable } from '@nestjs/common'
import { v7 as uuidV7 } from 'uuid'

import { paginator } from '@app/common/pagination'
import { CreateClientDto, UpdateClientDto } from '@app/contracts/clients'
import {
  Client,
  ClientProps,
  PaginatedClientsResponse,
  CreateClientResponse,
  RemoveClientResponse,
  UpdateClientResponse,
} from '@app/contracts/clients/clients.response'

import { PrismaService } from '@data-service/prisma.service'

@Injectable()
export class ClientsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createClientDto: CreateClientDto,
  ): Promise<CreateClientResponse> {
    await this.prismaService.clients.create({
      data: {
        id: uuidV7(),
        name: createClientDto.name,
        email: createClientDto.email,
        phone: createClientDto.phone,
        created_at: new Date(),
        address: createClientDto.address,
        dni: createClientDto.dni,
        last_name: createClientDto.lastName,
      },
    })

    return {
      message: 'Client created successfully',
    }
  }

  async findAll({
    orderBy,
    where,
    ...props
  }: ClientProps): Promise<PaginatedClientsResponse> {
    const results = await paginator.paginate(
      this.prismaService.clients,
      {
        orderBy: orderBy,
        where: where,
      },
      { ...props },
    )

    return {
      ...results,
      data: results.data.map(({ last_name, created_at, ...client }) => {
        return {
          ...client,
          lastName: last_name,
          createdAt: created_at,
        }
      }),
    }
  }

  async findOne(id: string): Promise<Client> {
    const result = await this.prismaService.clients.findUniqueOrThrow({
      where: { id },
    })

    return {
      ...result,
      lastName: result.last_name,
      createdAt: result.created_at,
    }
  }

  async update(
    id: string,
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

  async remove(id: string): Promise<RemoveClientResponse> {
    await this.prismaService.clients.delete({
      where: { id: id }, // Convertimos a número por si acaso
    })
    return {
      message: 'Client removed successfully',
    }
  }
}
