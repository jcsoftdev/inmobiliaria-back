import { ApiResponseProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'

import { createPaginationError } from '@app/common/pagination/paginator.error'

export interface PaginateOptions {
  page?: number
  perPage?: number
}

export class PaginationMeta {
  @ApiResponseProperty({ type: Number })
  total!: number

  @ApiResponseProperty({ type: Number })
  lastPage!: number

  @ApiResponseProperty({ type: Number })
  currentPage!: number

  @ApiResponseProperty({ type: Number })
  perPage!: number

  @ApiResponseProperty({ type: Number })
  prev!: number | null

  @ApiResponseProperty({ type: Number })
  next!: number | null
}

export class PaginatedResult<T = unknown> {
  @ApiResponseProperty({ type: [Object] })
  data!: T[]
  @ApiResponseProperty({ type: PaginationMeta })
  meta!: PaginationMeta
}

type InferData<T, A> = Prisma.Result<T, A, 'findMany'>

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

  async paginate<
    T extends {
      findMany: (args: P) => Promise<InferData<T, P>>
      count: (args: {
        where?: P extends { where?: infer W } ? W : never
      }) => Promise<number>
    },
    P extends Prisma.Args<T, 'findMany'>,
  >(
    model: T,
    args: P,
    options: PaginateOptions = {},
  ): Promise<PaginatedResult<InferData<T, P>[number]>> {
    const page = options.page ?? this.defaultPage
    const perPage = options.perPage ?? this.defaultPerPage
    const { page: validatedPage, perPage: validatedPerPage } =
      this.validatePaginationOptions(page, perPage)

    const skip = (validatedPage - 1) * validatedPerPage

    try {
      const where =
        'where' in args
          ? (args.where as P extends { where?: infer W } ? W : never)
          : undefined

      const [total, data] = await Promise.all([
        model.count({ where }),
        model.findMany({
          ...(args as Record<string, unknown>),
          skip,
          take: validatedPerPage,
        } as P),
      ])

      const lastPage = Math.max(1, Math.ceil(total / validatedPerPage))

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
      throw createPaginationError(this.getErrorMessage(error))
    }
  }

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error'
  }
}

export type PaginationProps<Where, OrderBy, Select> = {
  page?: number
  perPage?: number
  where?: Where
  orderBy?: OrderBy
  select?: Select
}

export const paginator = new Paginator({ page: 1, perPage: 10 })
