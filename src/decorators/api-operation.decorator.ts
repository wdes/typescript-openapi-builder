/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { isUndefined, negate, pickBy } from 'lodash';
import { DECORATORS } from '../constants';
import { OperationObject } from '../interfaces/open-api-spec.interface';
import { createMethodDecorator } from './helpers';

export type ApiOperationOptions = Partial<OperationObject>;

const defaultOperationOptions: ApiOperationOptions = {
  summary: ''
};

export function ApiOperation(options: ApiOperationOptions): MethodDecorator {
  return createMethodDecorator(
    DECORATORS.API_OPERATION,
    pickBy(
      {
        ...defaultOperationOptions,
        ...options
      } as ApiOperationOptions,
      negate(isUndefined)
    )
  );
}
