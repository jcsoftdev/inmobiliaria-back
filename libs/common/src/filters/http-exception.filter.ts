import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { throwError } from 'rxjs'

import {
  ERROR_TYPES,
  TypedRpcException,
} from '@app/common/exceptions/rpc.exception'

@Catch(HttpException)
export class HttpValidationForRPCFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    console.log('🚨 HttpValidationForRPCFilter:', exception)
    const response = exception.getResponse() as {
      statusCode: number
      message: string | string[]
    }
    console.log('response:', response.message)
    if (exception instanceof BadRequestException) {
      return throwError(
        () =>
          new TypedRpcException({
            errorType: ERROR_TYPES.BAD_REQUEST,
            statusCode: exception.getStatus(),
            message: response.message,
          }),
      )
    }
  }
}
