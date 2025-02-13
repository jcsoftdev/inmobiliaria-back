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

export interface RpcError {
  errorType?: string
  statusCode?: number
  message?: string | object
}

export class RpcExceptionSerializedWithResponse {
  error!: RpcException
  message!: string
  errorResponse!: RpcError
}

export class TypedRpcException<
  T extends RpcError = RpcError,
  E extends string = 'INTERNAL_ERROR',
> extends RpcException {
  private readonly errorResponse: RpcError

  constructor(
    error:
      | { errorType: E; statusCode: number; message: string }
      | (T & { errorType: E }),
  ) {
    if (error && 'errorType' in error) {
      // This handles both local exceptions and deserialized exceptions from other microservices
      super(error)
      this.errorResponse = error
    } else {
      throw new Error('Invalid error format')
    }
  }

  // Ensure the getError method returns the entire error object
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
  })
}
