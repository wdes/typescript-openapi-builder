/**
 * MIT License
 * Copyright (c) 2017-2020 Kamil Mysliwiec
 * @licence https://opensource.org/licenses/MIT
 * @source https://github.com/nestjs/swagger/tree/4.5.5
 */
import { OpenAPIObject } from '../interfaces';
import {
    ExternalDocumentationObject,
    SecuritySchemeObject,
    ServerVariableObject,
    TagObject,
} from '../interfaces/open-api-spec.interface';

export class DocumentBuilder {
    private readonly document: Omit<OpenAPIObject, 'paths'> = {
        openapi: '3.0.0',
        info: {
            title: '',
            description: '',
            version: '1.0.0',
            contact: {},
        },
        tags: [],
        servers: [],
        components: {},
    };

    public setTitle(title: string): this {
        this.document.info.title = title;
        return this;
    }

    public setDescription(description: string): this {
        this.document.info.description = description;
        return this;
    }

    public setVersion(version: string): this {
        this.document.info.version = version;
        return this;
    }

    public setTermsOfService(termsOfService: string): this {
        this.document.info.termsOfService = termsOfService;
        return this;
    }

    public setContact(name: string, url: string, email: string): this {
        this.document.info.contact = { name, url, email };
        return this;
    }

    public setLicense(name: string, url: string): this {
        this.document.info.license = { name, url };
        return this;
    }

    public addServer(url: string, description?: string, variables?: Record<string, ServerVariableObject>): this {
        this.document.servers.push({ url, description, variables });
        return this;
    }

    public setExternalDoc(description: string, url: string): this {
        this.document.externalDocs = { description, url };
        return this;
    }

    public addTag(name: string, description = '', externalDocs?: ExternalDocumentationObject): this {
        //FIXME: broken since removal of l o d a s h
        this.document.tags = this.document.tags
            .concat
            /*pickBy(
                {
                    name,
                    description,
                    externalDocs,
                },
                negate(isUndefined)
            ) as TagObject*/
            ();
        return this;
    }

    public addSecurity(name: string, options: SecuritySchemeObject): this {
        this.document.components.securitySchemes = {
            ...(this.document.components.securitySchemes || {}),
            [name]: options,
        };
        return this;
    }

    public addSecurityRequirements(name: string, requirements: string[] = []): this {
        this.document.security = (this.document.security || []).concat({
            [name]: requirements,
        });
        return this;
    }

    public addBearerAuth(
        options: SecuritySchemeObject = {
            type: 'http',
        },
        name = 'bearer'
    ): this {
        this.addSecurity(name, {
            scheme: 'bearer',
            bearerFormat: 'JWT',
            ...options,
        });
        return this;
    }

    public addOAuth2(
        options: SecuritySchemeObject = {
            type: 'oauth2',
        },
        name = 'oauth2'
    ): this {
        this.addSecurity(name, {
            type: 'oauth2',
            flows: {},
            ...options,
        });
        return this;
    }

    public addApiKey(
        options: SecuritySchemeObject = {
            type: 'apiKey',
        },
        name = 'api_key'
    ): this {
        this.addSecurity(name, {
            type: 'apiKey',
            in: 'header',
            name,
            ...options,
        });
        return this;
    }

    public addBasicAuth(
        options: SecuritySchemeObject = {
            type: 'http',
        },
        name = 'basic'
    ): this {
        this.addSecurity(name, {
            type: 'http',
            scheme: 'basic',
            ...options,
        });
        return this;
    }

    public addCookieAuth(
        cookieName: string = 'connect.sid',
        options: SecuritySchemeObject = {
            type: 'apiKey',
        },
        securityName = 'cookie'
    ): this {
        this.addSecurity(securityName, {
            type: 'apiKey',
            in: 'cookie',
            name: cookieName,
            ...options,
        });
        return this;
    }

    public build(): Omit<OpenAPIObject, 'components' | 'paths'> {
        return this.document;
    }
}
