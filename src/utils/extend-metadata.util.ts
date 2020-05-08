/**
 * MIT License
 * Copyright (c) 2019-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/blob/4.5.5/lib/types/extend-metadata.util.ts
 */
import 'reflect-metadata';

export function extendMetadata<T extends Record<string, any>[] = any[]>(metadata: T, metakey: string, target: object) {
    const existingMetadata = Reflect.getMetadata(metakey, target);
    if (!existingMetadata) {
        return metadata;
    }
    return existingMetadata.concat(metadata);
}
