import { expect } from 'chai';
import Builders from '../src/builders';

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
                            methods: [
                                {
                                    name: 'getFooList',
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
                        },
                    ],
                },
            ]);
        });
    });
};
