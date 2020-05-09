import { expect } from 'chai';
import { TypeScriptOpenAPIBuilder } from '../src/index';
import { OpenAPIObject } from '../src/interfaces';
import { DocumentBuilder } from '../src/scan/document-builder';

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
                        },
                    },
                    '/admin/patch': {
                        patch: {
                            responses: {},
                            description: '',
                            summary: '',
                            tags: ['admin'],
                        },
                    },
                    '/admin/delete': {
                        put: {
                            responses: {},
                            description: '',
                            summary: '',
                            tags: ['admin'],
                        },
                        delete: {
                            responses: {},
                            description: '',
                            summary: '',
                            tags: ['admin', 'special'],
                        },
                    },
                    '/admin/list': {
                        get: {
                            responses: {},
                            description: 'get the list of foo elements',
                            summary: 'get the list of foo elements',
                            tags: ['admin'],
                        },
                    },
                    '/dev/tools': {
                        get: {
                            description: 'get the list of dev tools',
                            responses: {},
                            summary: 'get the list of dev tools',
                            tags: [],
                        },
                    },
                    '/admin/legacy/delete': {
                        delete: {
                            description: '',
                            responses: {},
                            summary: '',
                            tags: ['admin'],
                        },
                        post: {
                            description: '',
                            responses: {},
                            summary: '',
                            tags: ['admin'],
                        },
                    },
                    '/admin/v1/legacy/delete': {
                        post: {
                            description: '',
                            responses: {},
                            summary: '',
                            tags: ['admin'],
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
        });
    });
};
