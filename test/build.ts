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
                                },
                            ],
                            methods: [
                                {
                                    name: 'getFooList',
                                    decorators: [
                                        {
                                            name: 'Get',
                                        },
                                        {
                                            name: 'ApiHeader',
                                            properties: {
                                                description: 'The is cool header',
                                                name: 'Is-Cool',
                                            },
                                        },
                                    ],
                                },
                                {
                                    name: 'addToFooList',
                                    decorators: [
                                        {
                                            name: 'Post',
                                        },
                                    ],
                                },
                                {
                                    name: 'deleteFromFooList',
                                    decorators: [
                                        {
                                            name: 'Delete',
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
