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

import { IsUUIDv7 } from '@app/common/decorators'
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
  @IsEnum(PropertyType, {
    message: `type must be one of: ${Object.values(PropertyType).join(', ')}`,
  })
  type!: PropertyType

  @ApiProperty({
    description: 'Agency id',
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  @IsUUIDv7()
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
  @IsOptional()
  location!: LocationType

  @ApiProperty({
    description: 'Property features',
    example: [
      { name: 'bedrooms', value: 3 },
      { name: 'hasGarage', value: true },
      { name: 'flooring', value: 'wood' },
    ],
  })
  @IsArray({ message: 'features must be an array' })
  @ValidateNested({ each: true })
  @Type(() => PropertyFeature)
  @IsOptional()
  features!: PropertyFeature[]

  @ApiProperty({
    description: 'Property amenities',
    example: ['cerca al parque', 'cerca al hospital', 'tiene piscina'],
  })
  @IsArray({ message: 'amenities must be an array' })
  @IsString({ each: true })
  @IsOptional()
  amenities!: string[]

  @ApiProperty({
    description: 'Property status',
    example: PropertyStatus.AVAILABLE,
  })
  @IsEnum(PropertyStatus, {
    message: `status must be one of: ${Object.values(PropertyStatus).join(', ')}`,
  })
  status!: PropertyStatus

  @ApiProperty({
    description: 'User id',
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  @IsUUIDv7()
  @IsOptional()
  userId!: string
}
