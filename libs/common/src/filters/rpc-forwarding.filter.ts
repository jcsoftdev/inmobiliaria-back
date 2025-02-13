import {
  deserializeRpcException,
  ERROR_TYPES,
  RpcExceptionSerializedWithResponse,
} from '@app/common/exceptions/rpc.exception'
import { Catch, RpcExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { throwError } from 'rxjs'

@Catch()
export class RpcErrorForwardingFilter
  implements RpcExceptionFilter<RpcExceptionSerializedWithResponse>
{
  catch(exception: RpcExceptionSerializedWithResponse) {
    console.error('🚨 RPC Forwarding errors:', exception.errorResponse)

    if (exception instanceof RpcException) {
      return throwError(() => exception) // ✅ Return existing RpcException
    }

    const errorResponse = exception?.errorResponse

    if (errorResponse) {
      return throwError(() => deserializeRpcException(errorResponse))
    }

    return throwError(() =>
      deserializeRpcException({
        errorType: ERROR_TYPES.INTERNAL_ERROR,
        statusCode: 500,
        message: 'An unexpected error occurred',
      }),
    )
  }
}
