/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { SwaggerEnumType } from '../types/swagger-enum.type';
import { ParameterObject } from '../interfaces/open-api-spec.interface';

export interface ApiHeaderOptions extends Omit<ParameterObject, 'in'> {
    enum?: SwaggerEnumType;
}

const defaultHeaderOptions: Partial<ApiHeaderOptions> = {
    name: '',
};

export function ApiHeader(options: ApiHeaderOptions): void {
    return;
}

export const ApiHeaders = (headers: ApiHeaderOptions[]): void => {
    return;
};
