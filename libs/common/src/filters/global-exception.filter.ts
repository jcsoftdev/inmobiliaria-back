import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common'
import { Response } from 'express'
import { RpcException } from '@nestjs/microservices'
import { RpcError } from '@app/common/exceptions/types-rpc.exception'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: RpcError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    console.error('🚨 Exception Type:', exception?.constructor?.name)
    console.error('🚨 Full Exception:', exception)

    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      const errorResponse = exception.getResponse()
      response.status(status).json({
        statusCode: status,
        message: this.extractMessage(errorResponse),
      })
    } else if (exception instanceof RpcException) {
      console.log('✅ Caught RpcException')
      const errorResponse = exception.getError()
      response.status(400).json({
        statusCode: 400,
        message: this.extractMessage(errorResponse),
      })
    } else {
      console.log('❌ Unknown exception type')
      const internalError = new InternalServerErrorException({
        statusCode: exception.statusCode ?? 500,
        message: exception?.message ?? 'An internal server error occurred',
      })
      response.status(internalError.getStatus()).json({
        statusCode: internalError.getStatus(),
        message: internalError.message,
      })
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
