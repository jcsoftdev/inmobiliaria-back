import {
  ERROR_TYPES,
  RpcError,
  TypedRpcException,
} from '@app/common/exceptions/types-rpc.exception'
import { Catch, RpcExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { throwError } from 'rxjs'

@Catch()
export class GlobalRpcExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcError) {
    console.error('🚨 Global RPC Exception:', exception)

    if (exception instanceof RpcException) {
      return throwError(() => exception) // ✅ Return existing RpcException
    }

    return throwError(
      () =>
        new TypedRpcException(ERROR_TYPES.RPC_ERROR, {
          statusCode: exception.statusCode ?? 400,
          message: exception.message ?? 'An unexpected error occurred',
        }),
    )
  }
}
