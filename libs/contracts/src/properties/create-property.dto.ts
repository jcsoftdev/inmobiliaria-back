import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator'

import { IsUUIDv7 } from '@app/common/decorators'
import { Property } from '@app/contracts/properties/property.response'

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  PARKING = 'parking',
}

export enum PropertyStatus {
  AVAILABLE = 'available',
  SELL_PENDING = 'sell_pending',
  SOLD = 'sold',
  INACTIVE = 'inactive',
  RESERVED = 'reserved',
}

export class LocationType {
  @ApiProperty()
  @IsDefined({ message: 'Type is required' })
  @IsString({ message: 'Type must be a string' })
  @IsIn(['Point'], { message: 'Type must be "Point"' })
  type!: 'Point'

  @ApiProperty({ type: [Number], default: [0, 0] })
  @IsDefined({ message: 'Coordinates are required' })
  @IsArray({ message: 'Coordinates must be an array' })
  @IsNumber({}, { each: true, message: 'Each coordinate must be a number' })
  coordinates!: [number, number] // [latitude, longitude]

  @ApiProperty()
  @IsDefined({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  @Length(1, 255, { message: 'Address must be between 1 and 255 characters' })
  address!: string
}

export class PropertyFeature {
  @ApiProperty()
  @IsDefined({ message: 'Feature name is required' })
  @IsString({ message: 'Feature name must be a string' })
  @Length(1, 100, {
    message: 'Feature name must be between 1 and 100 characters',
  })
  name!: string

  @ApiProperty()
  @IsDefined({ message: 'value is required' })
  @IsString({ message: 'value must be string' })
  @Length(1, 100, {
    message: 'Feature value must be between 1 and 100 characters',
  })
  value!: string
}

export class CreatePropertyDto
  implements
    Readonly<
      Omit<
        Property,
        'id' | 'createdAt' | 'price' | 'agency_id' | 'user_id' | 'created_at'
      >
    >
{
  constructor() {
    console.log(this)
  }

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
  @IsOptional()
  type!: PropertyType

  @ApiProperty({
    description: 'Agency id',
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  @IsUUIDv7()
  agencyId!: string

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
    example: [{ name: 'has_pool', value: 'Piscina' }],
  })
  @IsArray({ message: 'features must be an array' })
  @ValidateNested({ each: true })
  @Type(() => PropertyFeature)
  features!: PropertyFeature[]

  @ApiProperty({
    description: 'Property amenities',
    example: ['cerca al parque', 'cerca al hospital', 'tiene piscina'],
  })
  @IsArray({ message: 'amenities must be an array' })
  @IsString({ each: true })
  amenities!: string[]

  @ApiProperty({
    description: 'Property status',
    example: PropertyStatus.AVAILABLE,
  })
  @IsEnum(PropertyStatus)
  @IsOptional()
  status!: PropertyStatus

  @ApiProperty({
    description: 'User id',
    example: '0195d983-c57b-724a-a5c1-e3fb0f543c41',
  })
  @IsUUIDv7()
  userId!: string
}
