/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { ApiSecurity } from './api-security.decorator';

export function ApiCookieAuth(name = 'cookie'): ClassDecorator & MethodDecorator {
    return ApiSecurity(name);
}
