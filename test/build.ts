import { expect } from 'chai';
import Builders from '../src/builders';
import Spec from '../src/spec';
import { OpenAPIObject } from '../src/interfaces';
import { DocumentBuilder } from '../src/scan/document-builder';

export default () => {
    suite('test build', () => {
        const fileToScan = __dirname + '/data/ExampleController.ts';
        test('Test example controller', () => {
            expect(Builders.buildMetaForFiles([fileToScan])).to.deep.equal([
                {
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
                                    ],
                                },
                                {
                                    name: 'patch',
                                    documentation: '',
                                    decorators: [
                                        {
                                            name: 'Patch',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    methods: [
                        {
                            decorators: [
                                {
                                    name: 'Patch',
                                    args: {
                                        0: '/legacy/patch',
                                    },
                                },
                            ],
                            name: 'legacyPatch',
                            documentation: '',
                        },
                    ],
                },
            ]);
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
                        },
                    },
                    '/admin/patch': {
                        patch: {
                            responses: {},
                            description: '',
                            summary: '',
                        },
                    },
                    '/admin/delete': {
                        delete: {
                            responses: {},
                            description: '',
                            summary: '',
                        },
                    },
                    '/legacy/patch': {
                        patch: {
                            responses: {},
                            description: '',
                            summary: '',
                        },
                    },
                    '/admin/list': {
                        get: {
                            responses: {},
                            description: 'get the list of foo elements',
                            summary: 'get the list of foo elements',
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