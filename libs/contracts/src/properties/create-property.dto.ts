import { IsEnum, IsNumber, IsString } from 'class-validator'

import {
  LocationType,
  Property,
  PropertyFeature,
  PropertyStatus,
  PropertyType,
} from '@app/contracts/properties/property.response'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePropertyDto
  implements Readonly<Omit<Property, 'id' | 'createdAt'>>
{
  @ApiProperty({
    description: 'Property title',
    example: 1,
  })
  @IsString()
  title!: string

  @ApiProperty({
    description: 'Property description',
    example: 'This is a description',
  })
  @IsString()
  description!: string

  @ApiProperty({
    description: 'Property type',
    example: PropertyType.APARTMENT,
  })
  @IsEnum(PropertyType)
  type!: PropertyType

  @ApiProperty({
    description: 'Agency id',
    example: 1,
  })
  @IsNumber()
  agencyId!: number

  @ApiProperty({
    description: 'Property price',
    example: 10000000,
  })
  @IsNumber()
  price!: number

  @ApiProperty({
    description: 'Property location',
    example: {
      type: 'Point',
      coordinates: [0, 0],
      name: 'Location name',
    },
  })
  location!: LocationType

  @ApiProperty({
    description: 'Property features',
    example: [
      {
        name: 'feature name',
        value: 'feature value',
      },
    ],
  })
  features!: PropertyFeature[]

  @ApiProperty({
    description: 'Property status',
    example: PropertyStatus.ACTIVE,
  })
  status!: PropertyStatus

  @ApiProperty({
    description: 'User id',
    example: 1,
  })
  @IsNumber()
  userId!: number
}
