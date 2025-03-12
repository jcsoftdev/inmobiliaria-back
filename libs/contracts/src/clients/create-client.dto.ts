import { ApiProperty } from '@nestjs/swagger'
import { clients } from '@prisma/client'
import { IsEmail, IsString } from 'class-validator'

type OmittedFields = 'id' | 'created_at'

type OverwriteFields = 'last_name'
export class CreateClientDto
  implements Omit<clients, OmittedFields | OverwriteFields>
{
  @ApiProperty({
    description: 'Client dni',
    example: '12345678',
  })
  @IsString()
  dni!: string

  @ApiProperty({
    description: 'Client last name',
    example: 'John',
  })
  @IsString()
  lastName!: string

  @ApiProperty({
    description: 'Client address',
    example: 'Av del Ejercito 123',
  })
  @IsString()
  address!: string

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
