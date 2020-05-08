import { expect } from 'chai';

export default () => {
    suite('test build', () => {
        test('Test dummy', () => {
            expect([1, 2, 3]).to.deep.equal([1, 2, 3]);
        });
    });
};
