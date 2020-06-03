import { expect } from 'chai';
import { TypeScriptOpenAPIBuilder } from '../src/index';
import { OpenAPIObject } from '../src/interfaces';
import { DocumentBuilder } from '../src/scan/document-builder';
import { SecurityRequirementObject } from '../src/interfaces/open-api-spec.interface';

export default () => {
    suite('test main', () => {
        const dirToScan = __dirname + '/data';
        test('Test build spec', () => {
            const document = new DocumentBuilder();
            document.setLicense('MPL-2.0', 'https://opensource.org/licenses/MPL-2.0');
            document.setDescription('Testing API');
            document.setExternalDoc('Williamdes', 'https://william/wdes.fr');
            document.setTitle('Test API');
            document.setVersion('v1');
            const spec = TypeScriptOpenAPIBuilder.buildSpec(document, dirToScan, /.*\.ts$/);
            const oa: OpenAPIObject = {
                paths: {
                    '/admin/add': {
                        post: {
                            responses: {},
                            description: '',
                            summary: '',
                            tags: ['admin'],
                            security: [
                                { token: ['admin'] } as SecurityRequirementObject,
                                { jwt: ['admin'] } as SecurityRequirementObject,
                            ],
                        },
                    },
                    '/admin/patch': {
                        patch: {
                            responses: {},
                            description: '',
                            summary: '',
                            tags: ['admin'],
                            security: [
                                { token: ['admin'] } as SecurityRequirementObject,
                                { apitoken: [] } as SecurityRequirementObject,
                            ],
                        },
                    },
                    '/admin/delete': {
                        put: {
                            responses: {},
                            description: '',
                            summary: '',
                            tags: ['admin'],
                            security: [{ token: ['admin'] } as SecurityRequirementObject],
                        },
                        delete: {
                            responses: {},
                            description: '',
                            summary: '',
                            tags: ['admin', 'special'],
                            security: [{ token: ['admin'] } as SecurityRequirementObject],
                        },
                    },
                    '/admin/list': {
                        get: {
                            responses: {},
                            deprecated: true,
                            description: 'get the list of foo elements',
                            summary: 'get the list of foo elements',
                            operationId: 'getFooList',
                            tags: ['admin'],
                            security: [{ token: ['admin'] } as SecurityRequirementObject],
                        },
                    },
                    '/dev/tools': {
                        get: {
                            description: 'get the list of dev tools',
                            responses: {},
                            summary: 'get the list of dev tools',
                            tags: [],
                            security: [],
                        },
                    },
                    '/admin/legacy/delete': {
                        delete: {
                            description: '',
                            responses: {},
                            summary: '',
                            tags: ['admin'],
                            security: [{ token: ['admin'] } as SecurityRequirementObject],
                        },
                        post: {
                            description: '',
                            responses: {},
                            summary: '',
                            tags: ['admin'],
                            security: [{ token: ['admin'] } as SecurityRequirementObject],
                        },
                    },
                    '/admin/v1/legacy/delete': {
                        post: {
                            description: '',
                            responses: {},
                            summary: '',
                            tags: ['admin'],
                            security: [{ token: ['admin'] } as SecurityRequirementObject],
                        },
                    },
                },
                components: {},
                externalDocs: {
                    description: 'Williamdes',
                    url: 'https://william/wdes.fr',
                },
                info: {
                    contact: {},
                    description: 'Testing API',
                    license: {
                        name: 'MPL-2.0',
                        url: 'https://opensource.org/licenses/MPL-2.0',
                    },

                    title: 'Test API',
                    version: 'v1',
                },
                openapi: '3.0.0',
                servers: [],
                tags: [],
            };
            expect(spec).to.deep.equal(oa);
            const specJson = TypeScriptOpenAPIBuilder.buildJsonSpec(document, dirToScan, /.*\.ts$/);
            expect(JSON.parse(specJson)).to.deep.equal(oa);
        })
            .timeout(10000)
            .slow(5000);
    });
};
