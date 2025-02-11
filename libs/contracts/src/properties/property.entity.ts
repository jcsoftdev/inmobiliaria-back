export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  PARKING = 'parking',
}

export interface Location {
  type: 'Point'
  coordinates: [number, number] // [latitude, longitude]
  name: string
}

export interface PropertyFeature {
  name: string
  value: string
}

export type PropertyStatus =
  | 'active'
  | 'sell_pending'
  | 'sold'
  | 'inactive'
  | 'reserved'

export interface Property {
  id: number
  title: string
  description?: string
  type?: PropertyType
  agencyId?: number
  price: number
  location: Location
  features: PropertyFeature[]
  createdAt?: Date
  status?: PropertyStatus
  userId?: number
}
