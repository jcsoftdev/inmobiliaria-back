import { Catch, RpcExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { throwError } from 'rxjs'

import {
  deserializeRpcException,
  ERROR_STATUS,
  ERROR_TYPES,
  ERROR_TYPES_MESSAGE,
  RpcExceptionSerializedWithResponse,
} from '@app/common/exceptions/rpc.exception'

@Catch()
export class RpcErrorForwardingFilter
  implements RpcExceptionFilter<RpcExceptionSerializedWithResponse>
{
  catch(exception: RpcExceptionSerializedWithResponse) {
    console.error('🚨 RPC Forwarding errors:', exception.constructor)

    if (exception instanceof RpcException) {
      return throwError(() => exception) // ✅ Return existing RpcException
    }

    if (exception.constructor.name === 'PrismaClientKnownRequestError') {
      console.log(
        '❌ PrismaClientKnownRequestError:',
        exception.message.toString(),
      )
      return throwError(() =>
        deserializeRpcException({
          errorType: ERROR_TYPES.BAD_REQUEST,
          statusCode: ERROR_STATUS.BAD_REQUEST,
          message: ERROR_TYPES_MESSAGE.BAD_REQUEST,
        }),
      )
    }

    const errorResponse = exception?.errorResponse

    if (errorResponse) {
      return throwError(() => deserializeRpcException(errorResponse))
    }

    return throwError(() =>
      deserializeRpcException({
        errorType: ERROR_TYPES.INTERNAL_ERROR,
        statusCode: ERROR_STATUS.INTERNAL_ERROR,
        message: 'An unexpected error occurred while processing the request',
      }),
    )
  }
}
