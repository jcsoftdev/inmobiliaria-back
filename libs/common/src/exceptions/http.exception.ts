import { RpcError } from '@app/common/exceptions/rpc.exception'
import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomHttpException extends HttpException {
  private readonly errorDetails: RpcError

  constructor(errorDetails: RpcError) {
    super(
      errorDetails,
      errorDetails.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
    )
    this.errorDetails = errorDetails
  }

  getError(): RpcError {
    return this.errorDetails
  }
}
