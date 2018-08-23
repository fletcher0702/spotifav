import { expect } from 'chai';
import findMe from './findMe';

describe('api > users > middleware > findMe ', () => {
  it('should export a function', () => {
    expect(findMe).to.be.a('function');
  });
});
