/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { RequestBodyObject, SchemaObject } from '../interfaces/open-api-spec.interface';
import { SwaggerEnumType } from '../types/swagger-enum.type';

type RequestBodyOptions = Omit<RequestBodyObject, 'content'>;

interface ApiBodyMetadata extends RequestBodyOptions {
    type?: Function | [Function] | string;
    isArray?: boolean;
    enum?: SwaggerEnumType;
}

interface ApiBodySchemaHost extends RequestBodyOptions {
    schema: SchemaObject;
}

export type ApiBodyOptions = ApiBodyMetadata | ApiBodySchemaHost;

const defaultBodyMetadata: ApiBodyMetadata = {
    type: String,
    required: true,
};

export function ApiBody(options: ApiBodyOptions): void {
    return;
}
