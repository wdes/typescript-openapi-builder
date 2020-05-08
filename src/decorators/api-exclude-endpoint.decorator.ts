/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { DECORATORS } from '../constants';
import { createMethodDecorator } from './helpers';

export function ApiExcludeEndpoint(disable = true): MethodDecorator {
    return createMethodDecorator(DECORATORS.API_EXCLUDE_ENDPOINT, {
        disable,
    });
}
