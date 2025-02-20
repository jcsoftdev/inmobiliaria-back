import { clients } from '@prisma/client'

export type Client = clients

export type CreationClient = {
  message: string
}

export type UpdateClient = clients

export type RemoveClient = {
  message: string
}
