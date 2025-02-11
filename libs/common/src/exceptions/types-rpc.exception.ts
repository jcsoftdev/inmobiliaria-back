import { RpcException } from '@nestjs/microservices'

export const ERROR_TYPES = {
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  BAD_REQUEST: 'BAD_REQUEST',
  RPC_ERROR: 'MS_ERROR',
} as const

export class TypedRpcException<
  T extends Record<string, unknown>,
  E extends string = 'INTERNAL_ERROR', // Default error type
> extends RpcException {
  public readonly errorType: E
  public readonly errorDetails: T

  constructor(errorType: E, errorDetails: T) {
    super({ errorType, ...errorDetails }) // Pass structured error to RpcException
    this.errorType = errorType
    this.errorDetails = errorDetails
  }
}

export interface RpcError {
  errorType?: string
  statusCode?: number
  message?: string
}
