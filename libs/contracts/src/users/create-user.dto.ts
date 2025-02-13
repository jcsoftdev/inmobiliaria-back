import { IsEmail, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  agencyId?: number

  @IsString()
  password: string

  @IsString()
  phone: string

  @IsString()
  role: string

  constructor(data: CreateUserDto) {
    this.agencyId = data.agencyId
    this.name = data.name
    this.email = data.email
    this.password = data.password
    this.phone = data.phone
    this.role = data.role
  }
}
