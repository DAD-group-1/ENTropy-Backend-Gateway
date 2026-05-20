import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Checks if the given value can be converted to a number. If not, throws an HttpException with the provided error message.
 * @param value The value to check
 * @param error The error message to include in the exception if the value is not a number
 * @throws HttpException with the provided error message if the value cannot be converted to a number
 */
export function assertObjectIsNumber(value: any, error: string): void {
  if (isNaN(Number(value))) {
    throwHttpError(error);
  }
}

/**
 * Checks if the given value is null or undefined. If it is, throws an HttpException with the provided error message and a 404 Not Found status code.
 * @param value The value to check
 * @param error The error message to include in the exception if the value is null or undefined
 * @throws HttpException with the provided error message and a 404 Not Found status code if the value is null or undefined
 */
export function assertObjectIsNotEmpty(value: any, error: string): void {
  if (value === null || value === undefined) {
    throwHttpError(error, HttpStatus.NOT_FOUND);
  }
}

/**
 * Throws an HttpException with the given error message and status code.
 * @param error The error message to include in the exception
 * @param status The HTTP status code to use for the exception (default is 400 Bad Request)
 * @throws HttpException with the given error message and status code
 */
export function throwHttpError(
  error: string,
  status: HttpStatus = HttpStatus.BAD_REQUEST,
): void {
  throw new HttpException(error, status, {
    cause: new Error(error),
  });
}
