import { IsEmail, IsString } from 'class-validator'

export class CreateClientDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  phone: string

  constructor(data: CreateClientDto) {
    this.name = data.name
    this.email = data.email
    this.phone = data.phone
  }
}
