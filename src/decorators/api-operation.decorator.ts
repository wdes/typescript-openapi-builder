/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { OperationObject } from '../interfaces/open-api-spec.interface';

export type ApiOperationOptions = Partial<OperationObject>;

const defaultOperationOptions: ApiOperationOptions = {
    summary: '',
};

export function ApiOperation(options: ApiOperationOptions): void {
    return;
}
