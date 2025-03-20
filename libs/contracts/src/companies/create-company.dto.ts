import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { companies } from '@prisma/client'
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator'

import { IsUUIDv7 } from '@app/common/decorators'

export class CreateCompanyDto implements Omit<companies, 'id'> {
  @ApiProperty({
    description: 'Name company',
    example: 'Inmobiliaria Urban Group S.A',
  })
  @IsString()
  name!: string

  @ApiProperty({
    description: 'Address company',
    example: 'Calle de la Inmobiliaria, #456, Barrio Las Palmas',
  })
  @IsString()
  address!: string

  @ApiProperty({
    description: 'Services company',
    example: 'Compra, venta y alquiler de propiedades',
  })
  @IsString()
  services!: string

  @ApiProperty({
    description: 'Email company',
    example: 'Inmobiliaria@gmail.com',
  })
  @IsEmail()
  email!: string

  @ApiProperty({
    description: 'Phone company',
    example: '928547563',
  })
  @IsString()
  phone!: string

  @ApiPropertyOptional({
    description: 'List of User IDs',
    example: ['01956c22-9b54-7628-8304-13024295978b'],
  })
  @IsOptional()
  @IsArray()
  @IsUUIDv7({ each: true })
  userIds?: string[]
}
