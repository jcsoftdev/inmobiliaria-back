import { PartialType } from '@nestjs/mapped-types'
import { IsString, IsEmail, IsOptional } from 'class-validator'
import { CreateAgencyDto } from './create-agency.dto'

export class UpdateAgencyDto extends PartialType(CreateAgencyDto) {
  id!: number
}
