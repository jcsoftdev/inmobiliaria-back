import { PrismaService } from '@data-service/prisma.service'
import { Injectable } from '@nestjs/common'

import { CreatePropertyDto, UpdatePropertyDto } from '@app/contracts/properties'
import {
  ERROR_TYPES,
  TypedRpcException,
} from '@app/common/exceptions/types-rpc.exception'

@Injectable()
export class PropertiesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createPropertyDto: CreatePropertyDto) {
    if (!createPropertyDto.agencyId || !createPropertyDto.userId) {
      return new TypedRpcException(ERROR_TYPES.BAD_REQUEST, {
        message: 'AgencyId and UserId are required',
        statusCode: 400,
      })
    }
    return this.prismaService.properties.create({
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
  }

  findAll() {
    return this.prismaService.properties.findMany()
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
