// PaginationError class

import { createPaginationError } from '@app/common/pagination/paginator.error'

// Interfaces for pagination options and results
export interface PaginateOptions {
  page?: number
  perPage?: number
}

export interface PaginationMeta {
  total: number
  lastPage: number
  currentPage: number
  perPage: number
  prev: number | null
  next: number | null
}

export class PaginatedResult<T> {
  data!: T[]
  meta!: PaginationMeta
}

export type PaginateFunction = <
  T,
  WhereType = Record<string, any>,
  OrderType = Record<string, any>,
>(
  model: {
    count: (args: { where?: WhereType; orderBy?: OrderType }) => Promise<number>
    findMany: (args: {
      where?: WhereType
      take?: number
      skip?: number
      orderBy?: OrderType
    }) => Promise<T[]>
  },
  args?: { where?: WhereType; orderBy?: OrderType },
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>

// Pagination class to encapsulate the behavior
class Paginator {
  private readonly defaultPage: number
  private readonly defaultPerPage: number

  constructor(defaultOptions: PaginateOptions = { page: 1, perPage: 10 }) {
    this.defaultPage = defaultOptions.page ?? 1
    this.defaultPerPage = defaultOptions.perPage ?? 10
  }

  private validatePaginationOptions(page: number, perPage: number) {
    return {
      page: Math.max(1, page),
      perPage: Math.max(1, perPage),
    }
  }

  paginate = async <
    T,
    WhereType = Record<string, any>,
    OrderType = Record<string, any>,
  >(
    model: {
      count: (args: {
        where?: WhereType
        orderBy?: OrderType
      }) => Promise<number>
      findMany: (args: {
        where?: WhereType
        take?: number
        skip?: number
        orderBy?: OrderType
      }) => Promise<T[]>
    },
    args?: { where?: WhereType; orderBy?: OrderType },
    options: PaginateOptions = {},
  ): Promise<PaginatedResult<T>> => {
    const page = options.page ?? this.defaultPage
    const perPage = options.perPage ?? this.defaultPerPage
    const { page: validatedPage, perPage: validatedPerPage } =
      this.validatePaginationOptions(page, perPage)

    const skip = (validatedPage - 1) * validatedPerPage

    const orderBy: OrderType | undefined =
      typeof args?.orderBy === 'string'
        ? (JSON.parse(args.orderBy) as OrderType)
        : args?.orderBy

    try {
      const [total, data] = await Promise.all([
        model.count({ where: args?.where }),
        model.findMany({
          ...args,
          take: validatedPerPage,
          skip,
          orderBy: orderBy,
        }),
      ])

      const lastPage = Math.ceil(total / validatedPerPage)

      return {
        data,
        meta: {
          total,
          lastPage,
          currentPage: validatedPage,
          perPage: validatedPerPage,
          prev: validatedPage > 1 ? validatedPage - 1 : null,
          next: validatedPage < lastPage ? validatedPage + 1 : null,
        },
      }
    } catch (error: unknown) {
      const message = this.getErrorMessage(error)
      throw createPaginationError(message)
    }
  }

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error'
  }
}

export type PaginationProps<Where, OrderBy> = {
  page?: number
  perPage?: number
  where?: Where
  orderBy?: OrderBy
}

// Usage
export const paginator = new Paginator({ page: 1, perPage: 10 })
