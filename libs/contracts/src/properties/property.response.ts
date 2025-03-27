import { ApiProperty } from '@nestjs/swagger'
import { Prisma, properties } from '@prisma/client'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'
import {
  LocationType,
  PropertyFeature,
  PropertyStatus,
  PropertyType,
} from '@app/contracts/properties/create-property.dto'

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
        | 'amenities'
      >
    >
{
  @ApiProperty()
  id!: string

  @ApiProperty()
  title!: string

  @ApiProperty({ type: String })
  description!: string | null

  @ApiProperty()
  type!: PropertyType

  @ApiProperty({ type: String })
  agencyId!: string | null

  @ApiProperty({ type: Number })
  price!: number

  @ApiProperty({ type: LocationType })
  location!: LocationType

  @ApiProperty({ type: [PropertyFeature] })
  features!: PropertyFeature[]

  @ApiProperty({ type: [String] })
  amenities!: string[]

  @ApiProperty({ type: Date })
  createdAt!: Date | null

  @ApiProperty({ enum: PropertyStatus })
  status!: PropertyStatus

  @ApiProperty({ type: String, nullable: true })
  userId!: string | null
}

export class PaginatedPropertiesResponse extends PaginatedResult<Property> {}

export class CreatePropertyResponse {
  @ApiProperty({ type: String })
  message!: string
}

export class UpdatePropertyResponse extends CreatePropertyResponse {}

export class RemovePropertyResponse extends CreatePropertyResponse {}

export type Fields = 'title' | 'description' | 'type' | 'price' | 'status'
export type PropertyProps = PaginationProps<
  Prisma.propertiesWhereInput,
  Prisma.propertiesOrderByWithRelationInput,
  Fields
>

export type PropertySingleProps = Omit<PropertyProps, 'where' | 'orderBy'>
