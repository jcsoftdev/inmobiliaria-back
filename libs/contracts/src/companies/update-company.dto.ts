import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'

import { CreateCompanyDto } from './create-company.dto'

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  id!: string

  @ApiPropertyOptional({
    description: 'Company name',
    example: 'Inmobiliaria Urban Group S.A.',
  })
  name?: string

  @ApiPropertyOptional({
    description: 'Company address',
    example: 'Calle de la Inmobiliaria, #456, Barrio Las Palmas',
  })
  address?: string

  @ApiPropertyOptional({
    description: 'Company service',
    example: 'Compra, venta y alquiler de propiedades',
  })
  services?: string

  @ApiPropertyOptional({
    description: 'Company email',
    example: 'Inmobiliaria@gmail.com',
  })
  email?: string

  @ApiPropertyOptional({
    description: 'Company phone',
    example: '928547563',
  })
  phone?: string
}

export class UpdateCompanyUserDto {
  companyId!: string

  @ApiPropertyOptional({
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  userIds?: string[]
}
