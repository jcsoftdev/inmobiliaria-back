import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail } from 'class-validator'

export class CreateAgencyDto {
  @ApiProperty({
    description: 'Agency name',
    example: 'Inmuebles Seguros',
  })
  @IsString()
  name!: string

  @ApiProperty({
    description: 'Agency address',
    example: 'Calle Real 12, Sevilla',
  })
  @IsString()
  address!: string

  @ApiProperty({
    description: 'Agency phone',
    example: '+34 954 567 321',
  })
  @IsString()
  phone!: string

  @ApiProperty({
    description: 'Agency email',
    example: 'Inmueblesseguros@gmail.com',
  })
  @IsEmail()
  email!: string
}
