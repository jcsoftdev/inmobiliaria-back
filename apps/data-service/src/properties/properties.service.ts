import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { v7 as uuidV7 } from 'uuid'

import {
  convertFieldsToArray,
  PaginatedResult,
  paginator,
} from '@app/common/pagination'
import { PropertyType, PropertyStatus } from '@app/contracts/properties'
import {
  CreatePropertyDto,
  CreatePropertyResponse,
  Property,
  PropertyFeature,
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
    await this.prismaService.properties.create({
      data: {
        id: uuidV7(),
        title: createPropertyDto.title,
        description: createPropertyDto.description,
        price: createPropertyDto.price,
        status: createPropertyDto.status,
        type: createPropertyDto.type,
        agency_id: createPropertyDto.agencyId,
        location: createPropertyDto.location
          ? (createPropertyDto.location as unknown as Prisma.InputJsonValue)
          : Prisma.JsonNull,
        features: createPropertyDto.features
          ? (createPropertyDto.features as unknown as Prisma.InputJsonValue)
          : Prisma.JsonNull,
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
      id: true,
      title: true,
      description: true,
      price: true,
      status: true,
      type: true,
      location: true,
      features: true,
      amenities: true,
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
        ({
          agency_id,
          user_id,
          created_at,
          location,
          features,
          amenities,
          ...property
        }): Property => ({
          ...property,
          price: Number(property.price),
          agencyId: agency_id ?? '',
          userId: user_id ?? '',
          createdAt: created_at,
          description: property.description ?? '',
          status: property.status as PropertyStatus,
          type: property.type as PropertyType,
          location: location
            ? (location as unknown as Property['location'])
            : { type: 'Point', coordinates: [0, 0], address: '' },
          features: features ? (features as unknown as PropertyFeature[]) : [],
          amenities: amenities ? (amenities as unknown as string[]) : [],
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
        price: updatePropertyDto.price
          ? new Prisma.Decimal(updatePropertyDto.price)
          : undefined,
        status: updatePropertyDto.status as PropertyStatus,
        type: updatePropertyDto.type as PropertyType,
        location: updatePropertyDto.location
          ? (updatePropertyDto.location as unknown as Prisma.InputJsonValue)
          : Prisma.JsonNull,
        features: updatePropertyDto.features
          ? (updatePropertyDto.features as unknown as Prisma.InputJsonValue)
          : Prisma.JsonNull,
        amenities: updatePropertyDto.amenities
          ? (updatePropertyDto.amenities as unknown as Prisma.InputJsonValue)
          : Prisma.JsonNull,
      },
    })
  }

  delete({ id }: { id: string }) {
    return this.prismaService.properties.delete({
      where: { id },
    })
  }
}
