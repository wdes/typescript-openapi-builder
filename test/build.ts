import { expect } from 'chai';
import Builders, { FileMetadata } from '../src/builders';
import Spec from '../src/spec';
import { OpenAPIObject } from '../src/interfaces';
import { DocumentBuilder } from '../src/scan/document-builder';
import { SecurityRequirementObject } from '../src/interfaces/open-api-spec.interface';

export default () => {
    suite('test build', () => {
        const fileToScan = __dirname + '/data/ExampleController.ts';
        test('Test example controller', () => {
            const metaFiles: FileMetadata[] = Builders.buildMetaForFiles([fileToScan]);
            const fileMeta: FileMetadata = {
                fileName: fileToScan,
                controllers: [
                    {
                        name: 'ExampleController',
                        decorators: [
                            {
                                name: 'Route',
                                args: {
                                    0: '/admin',
                                },
                            },
                            {
                                name: 'ApiTags',
                                args: {
                                    0: 'admin',
                                },
                            },
                            {
                                args: {
                                    '0': 'token',
                                    '1': ['admin'],
                                },
                                name: 'ApiSecurity',
                            },
                        ],
                        documentation: 'controller comment',
                        methods: [
                            {
                                name: 'getFooList',
                                documentation: 'get the list of foo elements',
                                decorators: [
                                    {
                                        name: 'Get',
                                        args: {
                                            0: '/list',
                                        },
                                    },
                                    {
                                        name: 'ApiHeader',
                                        args: {
                                            0: { description: 'The is cool header', name: 'Is-Cool' },
                                        },
                                    },
                                    {
                                        args: {
                                            '0': {
                                                deprecated: true,
                                                operationId: 'getFooList',
                                            },
                                        },
                                        name: 'ApiOperation',
                                    },
                                ],
                            },
                            {
                                name: 'addToFooList',
                                documentation: '',
                                decorators: [
                                    {
                                        name: 'Post',
                                        args: {
                                            0: '/add',
                                        },
                                    },
                                    {
                                        args: {
                                            '0': 'jwt',
                                            '1': ['admin'],
                                        },
                                        name: 'ApiSecurity',
                                    },
                                ],
                            },
                            {
                                name: 'deleteFromFooList',
                                documentation: '',
                                decorators: [
                                    {
                                        name: 'Delete',
                                        args: {
                                            0: '/delete',
                                        },
                                    },
                                    {
                                        name: 'ApiBearerAuth',
                                    },
                                    {
                                        name: 'ApiTags',
                                        args: {
                                            0: 'special',
                                        },
                                    },
                                ],
                            },
                            {
                                name: 'alsoAPutMethod',
                                documentation: '',
                                decorators: [
                                    {
                                        name: 'Put',
                                        args: {
                                            0: '/delete',
                                        },
                                    },
                                ],
                            },
                            {
                                name: 'complicatedRoute',
                                documentation: '',
                                decorators: [
                                    {
                                        name: 'Delete',
                                        args: {
                                            0: '/legacy/delete',
                                        },
                                    },
                                    {
                                        name: 'Post',
                                        args: {
                                            0: '/legacy/delete',
                                        },
                                    },
                                    {
                                        name: 'Post',
                                        args: {
                                            0: '/v1/legacy/delete',
                                        },
                                    },
                                ],
                            },
                            {
                                name: 'patch',
                                documentation: '',
                                decorators: [
                                    {
                                        name: 'Patch',
                                    },
                                    {
                                        args: {
                                            '0': 'apitoken',
                                        },
                                        name: 'ApiSecurity',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            };
            expect(metaFiles).to.deep.equal([fileMeta]);
        });
        test('Test build spec', () => {
            const metas = Builders.buildMetaForFiles([fileToScan]);
            const document = new DocumentBuilder();
            document.setLicense('MPL-2.0', 'https://opensource.org/licenses/MPL-2.0');
            document.setDescription('Testing API');
            document.setExternalDoc('Williamdes', 'https://william/wdes.fr');
            document.setTitle('Test API');
            document.setVersion('v1');
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
                            description: '',
                            responses: {},
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
            expect(Spec.buildSpecFromCollectedMeta(metas, document)).to.deep.equal(oa);
        });
    });
};
