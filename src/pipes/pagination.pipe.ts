import { PipeTransform } from '@nestjs/common';
import { PaginationQueryDto } from '@dad-group-1/backend-common';

export class PaginationPipe implements PipeTransform {
  transform(
    value: Record<string, string | string[] | undefined>,
  ): PaginationQueryDto {
    const page = parseInt((value.page as string) ?? '1', 10);
    const limit = parseInt((value.limit as string) ?? '10', 10);

    const dto = new PaginationQueryDto();
    dto.page = Math.max(1, page);
    dto.limit = Math.min(100, Math.max(1, limit));

    return dto;
  }
}
