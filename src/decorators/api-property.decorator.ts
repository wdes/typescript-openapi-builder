/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { SchemaObjectMetadata } from '../interfaces/schema-object-metadata.interface';

export interface ApiPropertyOptions extends Omit<SchemaObjectMetadata, 'name' | 'enum'> {
    name?: string;
    enum?: any[] | Record<string, any>;
    enumName?: string;
}

const isEnumArray = (obj: ApiPropertyOptions): boolean => obj.isArray && !!obj.enum;

export function ApiProperty(options: ApiPropertyOptions = {}): void {
    return;
}

export function ApiPropertyOptional(options: ApiPropertyOptions = {}): void {
    return ApiProperty({
        ...options,
        required: false,
    });
}

export function ApiResponseProperty(
    options: Pick<ApiPropertyOptions, 'type' | 'example' | 'format' | 'enum' | 'deprecated'> = {}
): void {
    return ApiProperty({
        readOnly: true,
        ...options,
    });
}
