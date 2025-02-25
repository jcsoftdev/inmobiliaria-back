import { Catch, RpcExceptionFilter } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { throwError } from 'rxjs'

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter
  implements RpcExceptionFilter<PrismaClientKnownRequestError>
{
  catch(exception: PrismaClientKnownRequestError) {
    return throwError(
      () =>
        new RpcException({
          statusCode: 400,
          message: `Prisma Error: ${exception.message}`,
        }),
    )
  }
}
