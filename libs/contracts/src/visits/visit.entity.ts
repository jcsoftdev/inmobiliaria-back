export interface Visit {
  id: number
  clientId: number
  propertyId: number
  scheduledAt: Date
  status?: string
  createdAt?: Date
}
