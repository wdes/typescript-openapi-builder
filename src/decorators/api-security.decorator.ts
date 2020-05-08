/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { DECORATORS } from '../constants';
import { SecurityRequirementObject } from '../interfaces/open-api-spec.interface';
import { extendMetadata } from '../utils/extend-metadata.util';

export function ApiSecurity(name: string, requirements: string[] = []): ClassDecorator & MethodDecorator {
    let metadata: SecurityRequirementObject[] = [{ [name]: requirements }];

    return (target: object, key?: string | symbol, descriptor?: TypedPropertyDescriptor<any>): any => {
        if (descriptor) {
            metadata = extendMetadata(metadata, DECORATORS.API_SECURITY, descriptor.value);
            Reflect.defineMetadata(DECORATORS.API_SECURITY, metadata, descriptor.value);
            return descriptor;
        }
        metadata = extendMetadata(metadata, DECORATORS.API_SECURITY, target);
        Reflect.defineMetadata(DECORATORS.API_SECURITY, metadata, target);
        return target;
    };
}
