export class CreateVisitDto {
  clientId: number

  propertyId: number

  scheduledAt: Date

  status?: string

  constructor(data: CreateVisitDto) {
    this.clientId = data.clientId
    this.propertyId = data.propertyId
    this.scheduledAt = data.scheduledAt
    this.status = data.status
  }
}
