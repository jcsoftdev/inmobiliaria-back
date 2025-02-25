import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'

import {
  LocationType,
  PropertyFeature,
  PropertyStatus,
  PropertyType,
} from '@app/contracts/properties/property.response'

import { CreatePropertyDto } from './create-property.dto'

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  id!: number
  @ApiPropertyOptional({
    description: 'Property title',
    example: 'Property title',
  })
  title?: string

  @ApiPropertyOptional({
    description: 'Agency id',
    example: 1,
  })
  agencyId?: number

  @ApiPropertyOptional({
    description: 'Property description',
    example: 'This is a description',
  })
  description?: string

  @ApiPropertyOptional({
    description: 'Property features',
    example: [
      {
        name: 'feature name',
        value: 'feature value',
      },
    ],
  })
  features?: PropertyFeature[]

  @ApiPropertyOptional({
    description: 'Property location',
    example: {
      type: 'Point',
      coordinates: [0, 0],
      address: 'Location name',
    },
  })
  location?: LocationType

  @ApiPropertyOptional({
    description: 'Property price',
    example: 10000000,
  })
  price?: number

  @ApiPropertyOptional({
    description: 'Property status',
    example: PropertyStatus.AVAILABLE,
  })
  status?: PropertyStatus

  @ApiPropertyOptional({
    description: 'Property type',
    example: PropertyType.APARTMENT,
  })
  type?: PropertyType

  @ApiPropertyOptional({
    description: 'User id',
    example: 1,
  })
  userId?: number
}
