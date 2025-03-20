import { ApiProperty } from '@nestjs/swagger'
import { companies, Prisma } from '@prisma/client'

import { PaginatedResult, PaginationProps } from '@app/common/pagination'

export class Company implements companies {
  @ApiProperty({
    type: String,
    example: 'Inmobiliaria Urban Group S.A.',
  })
  name!: string
  @ApiProperty({
    type: String,
    example: '01956c22-9b54-7628-8304-13024295978b',
  })
  id!: string
  @ApiProperty({
    type: String,
    example: 'Calle de la Inmobiliaria, #456, Barrio Las Palmas',
  })
  address!: string
  @ApiProperty({
    type: String,
    example: 'Compra, venta y alquiler de propiedades',
  })
  services!: string
  @ApiProperty({ type: String, example: 'Inmobiliaria@gmail.com' })
  email!: string
  @ApiProperty({ type: String, example: '928547563' })
  phone!: string

  @ApiProperty({
    type: [String],
    description: 'Users associated with the company',
  })
  users!: string[]
}

export class PaginatedCompaniesResponse extends PaginatedResult<Company> {}

export class CreateCompanyResponse {
  @ApiProperty({ type: String })
  message!: string
}

export class UpdateCompanyResponse extends CreateCompanyResponse {}

export class RemoveCompanyResponse extends CreateCompanyResponse {}

export class AddUsersReponse extends CreateCompanyResponse {
  @ApiProperty({
    type: [String],
    example: ['01956c22-9b54-7628-8304-13024295978b'],
  })
  adddedUsers!: string[]
}

export class RemoveUsersReponse extends CreateCompanyResponse {
  @ApiProperty({
    type: [String],
    example: ['01956c22-9b54-7628-8304-13024295978b'],
  })
  removedUsers!: string[]
}

export type CompanyFields = 'name' | 'address' | 'services' | 'email' | 'phone'
export type CompanyProps = PaginationProps<
  Prisma.companiesWhereInput,
  Prisma.companiesOrderByWithRelationInput,
  CompanyFields
>

export type CompanySingleProps = Omit<CompanyProps, 'where' | 'orderBy'>
