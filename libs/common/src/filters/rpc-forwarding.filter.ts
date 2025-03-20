import { Catch, RpcExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Prisma } from '@prisma/client'
import { throwError } from 'rxjs'

import {
  deserializeRpcException,
  ERROR_PROVIDERS,
  ERROR_STATUS,
  ERROR_TYPES,
  ERROR_TYPES_MESSAGE,
  RpcError,
  RpcExceptionSerializedWithResponse,
} from '@app/common/exceptions/rpc.exception'
import { SharedConfigService } from '@app/config'

@Catch()
export class RpcErrorForwardingFilter
  implements RpcExceptionFilter<RpcExceptionSerializedWithResponse>
{
  constructor(private readonly configService: SharedConfigService) {}
  catch(exception: RpcExceptionSerializedWithResponse) {
    if (exception instanceof RpcException) {
      return throwError(() => exception)
    }

    try {
      const error = JSON.parse(exception.details) as RpcError
      if (typeof error === 'object') {
        return throwError(() => deserializeRpcException(error))
      }
    } catch {
      console.log('')
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(
        '❌ PrismaClientKnownRequestError:',
        exception.message.split('\n')?.slice?.(-1)?.[0] ||
          exception.details ||
          exception.message,
      )
      let message = ''

      try {
        message = exception.message.split('\n').slice(-1)[0]
      } catch {
        message = exception.message
      }

      return throwError(() =>
        deserializeRpcException({
          errorProvider: ERROR_PROVIDERS.PRISMA,
          errorType: ERROR_TYPES.BAD_REQUEST,
          statusCode: ERROR_STATUS.BAD_REQUEST,
          message: this.configService.isDev()
            ? message
            : ERROR_TYPES_MESSAGE.BAD_REQUEST,
        }),
      )
    }

    const errorResponse = exception?.errorResponse

    if (errorResponse) {
      const deserializedError = deserializeRpcException(errorResponse)
      return throwError(() => deserializedError)
    }
    const deserializedError = deserializeRpcException({
      errorType: ERROR_TYPES.INTERNAL_ERROR,
      statusCode: ERROR_STATUS.INTERNAL_ERROR,
      message: this.configService.isDev()
        ? exception.message
        : 'An unexpected error occurred while processing the request',
    })

    return throwError(() => deserializedError)
  }
}
