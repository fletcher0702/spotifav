import { expect } from 'chai';
import updateMe from './updateMe';

describe('api > lists > middleware > updateMe ', () => {
  it('should export a function', () => {
    expect(updateMe).to.be.a('function');
  });
});
