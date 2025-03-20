import { Catch, RpcExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { Prisma } from '@prisma/client'
import { throwError } from 'rxjs'

import {
  deserializeRpcException,
  ERROR_STATUS,
  ERROR_TYPES,
  ERROR_TYPES_MESSAGE,
  RpcExceptionSerializedWithResponse,
} from '@app/common/exceptions/rpc.exception'
import { SharedConfigService } from '@app/config'

@Catch()
export class RpcErrorForwardingFilter
  implements RpcExceptionFilter<RpcExceptionSerializedWithResponse>
{
  private readonly isDev: boolean

  constructor(private readonly configService: SharedConfigService) {
    this.isDev = configService.getMode() === 'development'
  }
  catch(exception: RpcExceptionSerializedWithResponse) {
    console.error(
      '🚨 RPC Forwarding errors:',
      exception.constructor,
      exception.error,
    )

    if (exception instanceof RpcException) {
      return throwError(() => exception) // ✅ Return existing RpcException
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(
        '❌ PrismaClientKnownRequestError:',
        exception.message.toString(),
      )
      const message = exception.message.split('\n').slice(-1)[0]

      console.log({
        code: exception.code,
        meta: exception.message.split('\n').slice(-1)[0],
      })

      return throwError(() =>
        deserializeRpcException({
          errorType: ERROR_TYPES.BAD_REQUEST,
          statusCode: ERROR_STATUS.BAD_REQUEST,
          message: this.isDev ? message : ERROR_TYPES_MESSAGE.BAD_REQUEST,
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
