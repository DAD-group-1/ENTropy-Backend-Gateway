import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { PaginationQueryDto } from '@dad-group-1/backend-common';
import { ApiQuery } from '@nestjs/swagger';

interface PaginationQueryOptions {
  minPage?: number;
  maxPage?: number;
  minLimit?: number;
  maxLimit?: number;
  defaultPage?: number;
  defaultLimit?: number;
}

interface TemporalQueryOptions {
  startDate?: Date;
  endDate?: Date;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
}

/**
 * Custom parameter decorator to extract pagination query parameters from the request and apply validation and defaults.
 *
 * @param options - Optional configuration for pagination parameters, including min/max values and defaults.
 * @param ctx - Execution context to access the request object.
 * @returns PaginationQueryDto containing the validated and defaulted page and limit values.
 */
export const PaginationQueryParam = createParamDecorator(
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

/**
 * Decorator to extract pagination query parameters and document them in Swagger.
 *
 * @param options {@link PaginationQueryParam} options to configure pagination parameters and their documentation.
 */
export const PaginationQuery =
  (options: PaginationQueryOptions = {}): ParameterDecorator =>
  (target, propertyKey, parameterIndex) => {
    const descriptor = Object.getOwnPropertyDescriptor(
      target,
      propertyKey as string,
    );

    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      example: options.defaultPage ?? 1,
      // @ts-expect-error
    })(target, propertyKey as string, descriptor);

    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      example: options.defaultLimit ?? 10,
      // @ts-expect-error
    })(target, propertyKey as string, descriptor);

    PaginationQueryParam(options)(target, propertyKey, parameterIndex);
  };

export const TemporalQueryParam = createParamDecorator(
  (
    options: TemporalQueryOptions,
    ctx: ExecutionContext,
  ): { startDate?: string; endDate?: string } => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { start_date, end_date } = request.query;

    const result: { startDate?: string; endDate?: string } = {};

    if (start_date) {
      result.startDate = new Date(start_date as string)
        .toISOString()
        .split('T')[0];
    } else if (options.defaultStartDate) {
      result.startDate = options.defaultStartDate.toISOString().split('T')[0];
    }

    if (end_date) {
      result.endDate = new Date(end_date as string).toISOString().split('T')[0];
    } else if (options.defaultEndDate) {
      result.endDate = options.defaultEndDate.toISOString().split('T')[0];
    }

    return result;
  },
);

export const TemporalQuery =
  (options: TemporalQueryOptions = {}): ParameterDecorator =>
  (target, propertyKey, parameterIndex) => {
    const descriptor = Object.getOwnPropertyDescriptor(
      target,
      propertyKey as string,
    );

    ApiQuery({
      name: 'start_date',
      required: false,
      type: String,
      format: 'date',
      example:
        options.defaultStartDate ?? new Date().toISOString().split('T')[0],
      // @ts-expect-error
    })(target, propertyKey as string, descriptor);

    ApiQuery({
      name: 'end_date',
      required: false,
      type: String,
      format: 'date',
      example: options.defaultEndDate ?? new Date().toISOString().split('T')[0],
      // @ts-expect-error
    })(target, propertyKey as string, descriptor);

    TemporalQueryParam(options)(target, propertyKey, parameterIndex);
  };
