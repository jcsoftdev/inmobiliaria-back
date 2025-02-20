import { ApiResponseProperty } from '@nestjs/swagger'

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  PARKING = 'parking',
}

export class LocationType {
  @ApiResponseProperty()
  type!: 'Point'

  @ApiResponseProperty()
  coordinates!: [number, number] // [latitude, longitude]

  @ApiResponseProperty()
  name!: string
}

export class PropertyFeature {
  @ApiResponseProperty()
  name!: string

  @ApiResponseProperty()
  value!: string
}

export enum PropertyStatus {
  ACTIVE = 'active',
  SELL_PENDING = 'sell_pending',
  SOLD = 'sold',
  INACTIVE = 'inactive',
  RESERVED = 'reserved',
}

export class Property {
  @ApiResponseProperty()
  id!: number

  @ApiResponseProperty()
  title!: string

  @ApiResponseProperty()
  description?: string

  @ApiResponseProperty()
  type!: PropertyType

  @ApiResponseProperty()
  agencyId!: number | null

  @ApiResponseProperty()
  price!: number

  @ApiResponseProperty({ type: LocationType })
  location!: LocationType

  @ApiResponseProperty({ type: [PropertyFeature] })
  features!: PropertyFeature[]

  @ApiResponseProperty()
  createdAt!: Date | null

  @ApiResponseProperty({ enum: PropertyStatus })
  status!: PropertyStatus

  @ApiResponseProperty()
  userId!: number | null
}

export class CreatePropertyResponse {
  @ApiResponseProperty({ type: String })
  message!: string
}
