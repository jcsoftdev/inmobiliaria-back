import { ApiProperty } from '@nestjs/swagger'
import { Prisma, properties } from '@prisma/client'
import {
  IsArray,
  IsDefined,
  IsIn,
  IsNumber,
  IsString,
  Length,
} from 'class-validator'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  PARKING = 'parking',
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
  @IsDefined({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(1, 255, { message: 'Name must be between 1 and 255 characters' })
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

  @ApiProperty({ type: String, default: 'Could be string number or boolean' })
  @IsDefined({ message: 'Feature value is required' })
  value!: string | number | boolean
}

export enum PropertyStatus {
  AVAILABLE = 'available',
  SELL_PENDING = 'sell_pending',
  SOLD = 'sold',
  INACTIVE = 'inactive',
  RESERVED = 'reserved',
}
export class Property
  implements
    Readonly<
      Omit<
        properties,
        | 'location'
        | 'features'
        | 'price'
        | 'agency_id'
        | 'user_id'
        | 'created_at'
      >
    >
{
  @ApiProperty()
  id!: number

  @ApiProperty()
  title!: string

  @ApiProperty({ type: String })
  description!: string | null

  @ApiProperty()
  type!: PropertyType

  @ApiProperty({ type: Number })
  agencyId!: number | null

  @ApiProperty({ type: Number })
  price!: number

  @ApiProperty({ type: LocationType })
  location!: LocationType

  @ApiProperty({ type: [PropertyFeature] })
  features!: PropertyFeature[]

  @ApiProperty({ type: Date })
  createdAt!: Date | null

  @ApiProperty({ enum: PropertyStatus })
  status!: PropertyStatus

  @ApiProperty({ type: Number })
  userId!: number | null
}

export class PaginatedPropertiesResponse extends PaginatedResult<Property> {}

export class CreatePropertyResponse {
  @ApiProperty({ type: String })
  message!: string
}

export class UpdatePropertyResponse extends CreatePropertyResponse {}

export class RemovePropertyResponse extends CreatePropertyResponse {}

export type PropertyProps = PaginationProps<
  Prisma.propertiesWhereInput,
  Prisma.propertiesOrderByWithRelationInput,
  Prisma.propertiesSelect
>

export type PropertySingleProps = Omit<PropertyProps, 'where' | 'orderBy'>
