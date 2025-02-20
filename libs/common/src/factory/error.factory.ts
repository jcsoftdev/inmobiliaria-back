export enum ErrorType {
  PaginationError = 'PaginationError',
}

export class ErrorFactory extends Error {
  constructor(
    public type: ErrorType,
    message: string,
  ) {
    super(message)
    this.name = type
    this.type = type
  }
}
