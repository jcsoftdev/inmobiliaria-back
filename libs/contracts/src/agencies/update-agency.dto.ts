import { IsString, IsEmail, IsOptional } from 'class-validator'

export class UpdateAgencyDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  address?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsEmail()
  email?: string
}
