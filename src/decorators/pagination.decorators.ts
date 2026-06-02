import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { PaginationQueryDto } from '@dad-group-1/backend-common';

interface PaginationQueryOptions {
  minPage?: number;
  maxPage?: number;
  minLimit?: number;
  maxLimit?: number;
  defaultPage?: number;
  defaultLimit?: number;
}

export const PaginationQuery = createParamDecorator(
  (
    options: PaginationQueryOptions = {},
    ctx: ExecutionContext,
  ): PaginationQueryDto => {
    const {
      minPage = 1,
      maxPage = Infinity,
      minLimit = 1,
      maxLimit = 100,
      defaultPage = 1,
      defaultLimit = 10,
    } = options;

    const request = ctx.switchToHttp().getRequest<Request>();
    const { page, limit } = request.query;

    const dto = new PaginationQueryDto();
    dto.page = Math.min(
      maxPage,
      Math.max(minPage, page ? parseInt(page as string, 10) : defaultPage),
    );
    dto.limit = Math.min(
      maxLimit,
      Math.max(minLimit, limit ? parseInt(limit as string, 10) : defaultLimit),
    );

    return dto;
  },
);
