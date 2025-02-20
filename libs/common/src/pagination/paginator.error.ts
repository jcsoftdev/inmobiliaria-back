import { ErrorFactory, ErrorType } from '@app/common/factory/error.factory'

export class PaginationError extends ErrorFactory {
  constructor(message: string) {
    super(ErrorType.PaginationError, message)
  }
}

export const createPaginationError = (message: string) => {
  return new PaginationError(message)
}
