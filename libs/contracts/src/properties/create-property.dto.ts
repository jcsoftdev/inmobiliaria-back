import { IsEnum, IsNumber, IsString } from 'class-validator'

import {
  Location,
  Property,
  PropertyFeature,
  PropertyStatus,
  PropertyType,
} from '@app/contracts/properties/property.entity'

export class CreatePropertyDto implements Readonly<Omit<Property, 'id'>> {
  @IsString()
  title!: string

  @IsString()
  description!: string

  @IsEnum(PropertyType)
  type?: PropertyType

  @IsNumber()
  agencyId?: number

  @IsNumber()
  price!: number

  location!: Location
  features!: PropertyFeature[]
  status?: PropertyStatus

  @IsNumber()
  userId?: number
}
