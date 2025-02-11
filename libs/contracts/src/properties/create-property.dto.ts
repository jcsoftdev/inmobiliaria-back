import {
  Location,
  Property,
  PropertyFeature,
  PropertyStatus,
  PropertyType,
} from '@app/contracts/properties/property.entity'
import { IsEnum, IsNumber, IsString } from 'class-validator'

export class CreatePropertyDto implements Readonly<Omit<Property, 'id'>> {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsEnum(PropertyType)
  type?: PropertyType

  agencyId?: number

  @IsNumber()
  price: number

  location: Location
  features: PropertyFeature[]
  status?: PropertyStatus
  userId?: number

  constructor(data: CreatePropertyDto) {
    this.title = data.title
    this.description = data.description
    this.type = data.type
    this.agencyId = data.agencyId
    this.price = data.price
    this.location = data.location
    this.features = data.features
    this.status = data.status
    this.userId = data.userId
  }
}
