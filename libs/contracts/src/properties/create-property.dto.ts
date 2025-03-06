import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

import {
  LocationType,
  Property,
  PropertyFeature,
  PropertyStatus,
  PropertyType,
} from '@app/contracts/properties/property.response'

export class CreatePropertyDto
  implements
    Readonly<
      Omit<
        Property,
        'id' | 'createdAt' | 'price' | 'agency_id' | 'user_id' | 'created_at'
      >
    >
{
  @ApiProperty({
    description: 'Property title',
    example: '01956c22-9b54-7628-8304-13024295978b',
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
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  @IsString()
  @IsOptional()
  agencyId!: string | null

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
      address: 'Location name',
    },
  })
  @ValidateNested()
  @Type(() => LocationType)
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
  @IsArray({ message: 'Features must be an array of features' })
  @ValidateNested({ each: true })
  @Type(() => PropertyFeature)
  features!: PropertyFeature[]

  @ApiProperty({
    description: 'Property status',
    example: PropertyStatus.AVAILABLE,
  })
  @IsEnum(PropertyStatus)
  status!: PropertyStatus

  @ApiProperty({
    description: 'User id',
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  @IsNumber()
  userId!: string
}
