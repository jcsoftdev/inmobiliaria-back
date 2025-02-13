import { Response } from 'express'
import { CustomHttpException } from '@app/common/exceptions/http.exception'
import { RpcExceptionSerializedWithResponse } from '@app/common/exceptions/rpc.exception'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'

@Catch()
export class AllExceptionsFilter
  implements ExceptionFilter<RpcExceptionSerializedWithResponse>
{
  catch(exception: RpcExceptionSerializedWithResponse, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    console.error('🚨 Exception Type RPC:', exception?.constructor?.name)

    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      const errorResponse = exception.getResponse()
      response.status(status).json({
        statusCode: status,
        message: this.extractMessage(errorResponse),
      })
    } else {
      //
      console.log(
        '❌ Unknown exception type [Posible from another microservice]',
        exception,
      )
      const internalError = new CustomHttpException({
        statusCode: exception.errorResponse.statusCode ?? 500,
        message:
          exception?.errorResponse.message ??
          'An internal server error occurred',
        errorType: exception.errorResponse.errorType,
      })

      console.log(
        '🚨 Internal Error:',
        internalError.message,
        internalError.getStatus(),
      )

      response
        .status(internalError.getStatus())
        .json(internalError.getResponse())
    }
  }

  private extractMessage(errorResponse: unknown): string {
    if (typeof errorResponse === 'string') return errorResponse
    if (typeof errorResponse === 'object' && errorResponse !== null) {
      const message = (errorResponse as { message?: string | string[] }).message
      if (Array.isArray(message)) return message.join(', ')
      if (typeof message === 'string') return message
    }
    return 'An unexpected error occurred'
  }
}
