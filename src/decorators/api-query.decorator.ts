/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { ParameterObject, SchemaObject } from '../interfaces/open-api-spec.interface';
import { SwaggerEnumType } from '../types/swagger-enum.type';

type ParameterOptions = Omit<ParameterObject, 'in' | 'schema'>;

interface ApiQueryMetadata extends ParameterOptions {
    type?: Function | [Function] | string;
    isArray?: boolean;
    enum?: SwaggerEnumType;
    enumName?: string;
}

interface ApiQuerySchemaHost extends ParameterOptions {
    schema: SchemaObject;
}

export type ApiQueryOptions = ApiQueryMetadata | ApiQuerySchemaHost;

const defaultQueryOptions: ApiQueryOptions = {
    name: '',
    required: true,
};

export function ApiQuery(options: ApiQueryOptions): void {
    return;
}
