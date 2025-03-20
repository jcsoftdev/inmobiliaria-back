import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { v7 as uuidV7 } from 'uuid'

import {
  ERROR_TYPES,
  TypedRpcException,
} from '@app/common/exceptions/rpc.exception'
import {
  convertFieldsToArray,
  PaginatedResult,
  paginator,
} from '@app/common/pagination'
import {
  CreatePropertyDto,
  CreatePropertyResponse,
  Property,
  PropertyProps,
  UpdatePropertyDto,
} from '@app/contracts/properties'

import { PrismaService } from '@data-service/prisma.service'

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
        id: uuidV7(),
        title: createPropertyDto.title,
        description: createPropertyDto.description,
        price: createPropertyDto.price,
        status: createPropertyDto.status,
        type: createPropertyDto.type,
        agency_id: createPropertyDto.agencyId,
        user_id: createPropertyDto.userId,
        created_at: new Date(),
        location: {
          toJSON() {
            return createPropertyDto.location
          },
        },
        features: {
          toJSON() {
            return createPropertyDto.features
          },
        },
      },
    })

    return {
      message: 'Property created successfully',
    }
  }

  async findAll({
    where,
    orderBy,
    ...props
  }: PropertyProps): Promise<PaginatedResult<Property>> {
    let selectQuery: Prisma.propertiesSelect = {
      description: true,
      id: true,
      price: true,
      status: true,
      title: true,
      type: true,
      location: true,
      features: true,
      created_at: true,
      agency_id: true,
      user_id: true,
    }
    const fields = convertFieldsToArray(props.fields)

    if (fields.length) {
      selectQuery = {}
      fields.forEach((field) => {
        selectQuery[field] = true
      })
    }

    const res = await paginator.paginate(
      this.prismaService.properties,
      {
        select: selectQuery,
        where,
        orderBy,
      },
      props,
    )

    const response: PaginatedResult<Property> = {
      data: res.data.map(
        ({ agency_id, user_id, created_at, ...property }): Property => ({
          ...property,
          price: Number(property.price),
          agencyId: agency_id,
          userId: user_id,
          createdAt: created_at,
          description: property.description ?? '',
          status: property.status as Property['status'],
          type: property.type as Property['type'],
          location: property.location as unknown as Property['location'],
          features:
            property.features as string as unknown as Property['features'],
        }),
      ),
      meta: res.meta,
    }

    return response
  }

  findOne({ id }: { id: string }) {
    return this.prismaService.properties.findUniqueOrThrow({ where: { id } })
  }

  update(id: string, updatePropertyDto: UpdatePropertyDto) {
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

  delete({ id }: { id: string }) {
    return this.prismaService.properties.delete({
      where: { id },
    })
  }
}
