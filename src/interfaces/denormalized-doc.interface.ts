/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import {
  OpenAPIObject,
  OperationObject,
  ResponsesObject
} from './open-api-spec.interface';

export interface DenormalizedDoc extends Partial<OpenAPIObject> {
  root?: {
    method: string;
    path: string;
  } & OperationObject;
  responses?: ResponsesObject;
}
