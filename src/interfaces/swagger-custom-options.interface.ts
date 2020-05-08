/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
export interface SwaggerCustomOptions {
    explorer?: boolean;
    swaggerOptions?: any;
    customCss?: string;
    customCssUrl?: string;
    customJs?: string;
    customfavIcon?: string;
    swaggerUrl?: string;
    customSiteTitle?: string;
    validatorUrl?: string;
    url?: string;
    urls?: Record<'url' | 'name', string>[];
}
