import { ApiPropertyOptional } from '@nestjs/swagger'

export class AddUsersBody {
  companyId!: string

  @ApiPropertyOptional({
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  userIds?: string[]
}

export class DeleteUsersBody extends AddUsersBody {}
