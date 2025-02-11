import { IsString, IsEmail } from 'class-validator'

export class CreateAgencyDto {
  @IsString()
  name: string

  @IsString()
  address: string

  @IsString()
  phone: string

  @IsEmail()
  email: string

  constructor(data: CreateAgencyDto) {
    this.name = data.name
    this.address = data.address
    this.phone = data.phone
    this.email = data.email
  }
}
