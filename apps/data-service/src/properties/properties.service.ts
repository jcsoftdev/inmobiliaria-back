import { PrismaService } from '@data-service/prisma.service'
import { Injectable } from '@nestjs/common'

import {
  CreatePropertyDto,
  CreatePropertyResponse,
  Property,
  UpdatePropertyDto,
} from '@app/contracts/properties'
import {
  ERROR_TYPES,
  TypedRpcException,
} from '@app/common/exceptions/rpc.exception'

@Injectable()
export class PropertiesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createPropertyDto: CreatePropertyDto,
  ): Promise<CreatePropertyResponse> {
    if (!createPropertyDto.agencyId || !createPropertyDto.userId) {
      throw new TypedRpcException({
        errorType: ERROR_TYPES.BAD_REQUEST,
        statusCode: 400,
        message: 'Agency ID and User ID are required',
      })
    }
    await this.prismaService.properties.create({
      data: {
        title: createPropertyDto.title,
        description: createPropertyDto.description,
        price: createPropertyDto.price,
        status: createPropertyDto.status,
        type: createPropertyDto.type,
        agency_id: createPropertyDto.agencyId,
        user_id: createPropertyDto.userId,
        created_at: new Date(),
        location: JSON.stringify(createPropertyDto.location),
        features: JSON.stringify(createPropertyDto.features),
      },
    })

    return {
      message: 'Property created successfully',
    }
  }

  async findAll(): Promise<Property[]> {
    const data = await this.prismaService.properties.findMany()

    return data.map((property) => {
      return {
        id: property.id,
        title: property.title,
        price: Number(property.price),
        agencyId: property.agency_id,
        userId: property.user_id,
        createdAt: property.created_at,
        description: property.description ?? '',
        status: property.status as Property['status'],
        type: property.type as Property['type'],
        location: JSON.parse(
          property.location as string,
        ) as Property['location'],
        features: JSON.parse(
          property.features as string,
        ) as Property['features'],
      }
    })
  }

  findOne(id: number) {
    return this.prismaService.properties.findUniqueOrThrow({ where: { id } })
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.prismaService.properties.update({
      where: { id },
      data: {
        title: updatePropertyDto.title,
        description: updatePropertyDto.description,
        price: updatePropertyDto.price,
        status: updatePropertyDto.status,
        type: updatePropertyDto.type,
        agency_id: updatePropertyDto.agencyId,
        user_id: updatePropertyDto.userId,
        location: JSON.stringify(updatePropertyDto.location),
        features: JSON.stringify(updatePropertyDto.features),
      },
    })
  }

  remove(id: number) {
    return this.prismaService.properties.delete({
      where: { id: Number(id) }, // Convertimos a número por si acaso
    })
  }
}
