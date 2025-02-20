import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class CreateClientDto {
  @ApiProperty({
    description: 'Client name',
    example: 'John Doe',
  })
  @IsString()
  name!: string

  @ApiProperty({
    description: 'Client email',
    example: 'test@gmail.com',
  })
  @IsEmail()
  email!: string

  @ApiProperty({
    description: 'Client phone number',
    example: '123456789',
  })
  @IsString()
  phone!: string
}
