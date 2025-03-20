import { PartialType } from '@nestjs/mapped-types'
import { ApiPropertyOptional } from '@nestjs/swagger'

import { IsUUIDv7 } from '@app/common/decorators'

import { CreateClientDto } from './create-client.dto'

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsUUIDv7()
  id!: string

  @ApiPropertyOptional({
    description: 'Client email',
    example: 'email@mail.com',
  })
  email?: string

  @ApiPropertyOptional({
    description: 'Client name',
    example: 'John Doe',
  })
  name?: string

  @ApiPropertyOptional({
    description: 'Client phone number',
    example: '123456789',
  })
  phone?: string
}
