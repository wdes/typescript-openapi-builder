/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { OperationObject } from '../interfaces/open-api-spec.interface';

export type ApiOperationOptions = Pick<
    Partial<OperationObject>,
    'tags' | 'summary' | 'description' | 'operationId' | 'deprecated'
>;

export function ApiOperation(options: ApiOperationOptions): MethodDecorator {
    return () => {};
}
