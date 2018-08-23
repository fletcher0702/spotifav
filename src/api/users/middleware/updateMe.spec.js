import { expect } from 'chai';
import updateMe from './updateMe';

describe('api > users > middleware > updateMe ', () => {
  it('should export a function', () => {
    expect(updateMe).to.be.a('function');
  });
});
