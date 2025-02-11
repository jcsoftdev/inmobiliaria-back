import { Injectable } from '@nestjs/common'
import { CreatePropertyDto } from '@app/contracts/properties/create-property.dto'
import { UpdatePropertyDto } from '@app/contracts/properties/update-property.dto'
import { PrismaService } from '@data-service/prisma.service'

@Injectable()
export class PropertiesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createPropertyDto: CreatePropertyDto) {
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
    return (
      `This action updates a #${id} property` + updatePropertyDto.description
    )
  }

  remove(id: number) {
    return `This action removes a #${id} property`
  }
}
