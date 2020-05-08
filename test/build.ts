import { expect } from 'chai';
import Builders from '../src/builders';

export default () => {
    suite('test build', () => {
        const fileToScan = __dirname + '/data/ExampleController.ts';
        test('Test dummy', () => {
            expect(Builders.buildMetaForFiles([fileToScan])).to.deep.equal([
                {
                    fileName: fileToScan,
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
                    ],
                },
            ]);
        });
    });
};
