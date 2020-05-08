/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { DECORATORS } from '../constants';
import { createMixedDecorator } from './helpers';

export function ApiExtension(extensionKey: string, extensionProperties: any) {
  if (!extensionKey.startsWith('x-')) {
    throw new Error(
      'Extension key is not prefixed. Please ensure you prefix it with `x-`.'
    );
  }

  const extensionObject = {
    [extensionKey]:
      typeof extensionProperties !== 'string'
        ? { ...extensionProperties }
        : extensionProperties
  };

  return createMixedDecorator(DECORATORS.API_EXTENSION, extensionObject);
}
