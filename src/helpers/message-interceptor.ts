import {CallHandler, ExecutionContext, Injectable, NestInterceptor,} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class MessageTransformerInterceptor implements NestInterceptor {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                if (data && typeof data === 'object' && 'success' in data) {
                    return {
                        success: data.success,
                        data: data.data !== undefined ? data.data : data,
                    };
                }

                return {
                    success: true,
                    data: data,
                };
            }),
        );
    }
}
