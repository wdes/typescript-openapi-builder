/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { isNil, omit } from 'lodash';
import { ParameterObject, SchemaObject } from '../interfaces/open-api-spec.interface';
import { SwaggerEnumType } from '../types/swagger-enum.type';
import { addEnumArraySchema, addEnumSchema, isEnumArray, isEnumDefined } from '../utils/enum.utils';
import { createParamDecorator, getTypeIsArrayTuple } from './helpers';

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

export function ApiQuery(options: ApiQueryOptions): MethodDecorator {
    const apiQueryMetadata = options as ApiQueryMetadata;
    const [type, isArray] = getTypeIsArrayTuple(apiQueryMetadata.type, apiQueryMetadata.isArray);
    const param: ApiQueryMetadata & Record<string, any> = {
        name: isNil(options.name) ? defaultQueryOptions.name : options.name,
        in: 'query',
        ...omit(options, 'enum'),
        type,
        isArray,
    };

    if (isEnumArray(options)) {
        addEnumArraySchema(param, options);
    } else if (isEnumDefined(options)) {
        addEnumSchema(param, options);
    }

    return createParamDecorator(param, defaultQueryOptions);
}
