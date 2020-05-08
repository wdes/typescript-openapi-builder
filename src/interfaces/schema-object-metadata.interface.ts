/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */

import { SchemaObject } from './open-api-spec.interface';

export interface SchemaObjectMetadata
  extends Omit<SchemaObject, 'type' | 'required'> {
  type?: Function | [Function] | string | Record<string, any>;
  isArray?: boolean;
  required?: boolean;
  name?: string;
  enumName?: string;
}
