import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { GlobalResponseDto } from '@dad-group-1/backend-common';

export const ApiGlobalResponse = <TModel extends Type>(
  model: TModel,
  isArray = false,
) =>
  applyDecorators(
    ApiExtraModels(GlobalResponseDto, model),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(GlobalResponseDto) },
          {
            properties: {
              data: isArray
                ? { type: 'array', items: { $ref: getSchemaPath(model) } }
                : { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
