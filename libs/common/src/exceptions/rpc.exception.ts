import { RpcException } from '@nestjs/microservices'

export enum ERROR_TYPES {
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  BAD_REQUEST = 'BAD_REQUEST',
  RPC_ERROR = 'RPC_ERROR',
}

export enum ERROR_PROVIDERS {
  PRISMA = 'Prisma',
  GRPC = 'Grpc',
}

export const ERROR_TYPES_MESSAGE: Record<ERROR_TYPES, string> = {
  [ERROR_TYPES.INTERNAL_ERROR]: 'An unexpected error occurred',
  [ERROR_TYPES.VALIDATION_ERROR]: 'We found some validation errors',
  [ERROR_TYPES.NOT_FOUND]: 'Resource not found',
  [ERROR_TYPES.UNAUTHORIZED]: 'You are not authorized to access this resource',
  [ERROR_TYPES.FORBIDDEN]: 'You are not allowed to access this resource',
  [ERROR_TYPES.BAD_REQUEST]: 'Bad request',
  [ERROR_TYPES.RPC_ERROR]: 'An unexpected error occurred in the RPC service',
} as const

export const ERROR_STATUS: Record<ERROR_TYPES, number> = {
  [ERROR_TYPES.INTERNAL_ERROR]: 500,
  [ERROR_TYPES.VALIDATION_ERROR]: 400,
  [ERROR_TYPES.NOT_FOUND]: 404,
  [ERROR_TYPES.UNAUTHORIZED]: 401,
  [ERROR_TYPES.FORBIDDEN]: 403,
  [ERROR_TYPES.BAD_REQUEST]: 400,
  [ERROR_TYPES.RPC_ERROR]: 400,
} as const

export interface RpcError {
  errorProvider?: string
  errorType?: string
  statusCode?: number
  message?: string | object
}

export class RpcExceptionSerializedWithResponse {
  error!: RpcException
  message!: string
  errorResponse!: RpcError
  details!: string
}

export class TypedRpcException<
  T extends RpcError = RpcError,
> extends RpcException {
  private readonly errorResponse: RpcError

  constructor(error: T) {
    super(error)
    this.message = JSON.stringify(error)
    this.name = error.errorProvider ?? 'RpcException'
    this.errorResponse = error
  }

  getError(): RpcError {
    return this.errorResponse
  }
}

export function deserializeRpcException(
  exception: RpcError,
): TypedRpcException<RpcError> {
  return new TypedRpcException({
    errorType: exception.errorType ?? 'INTERNAL_ERROR',
    statusCode: exception.statusCode ?? 400,
    message: exception.message ?? 'An unexpected error occurred',
    ...exception,
  })
}
