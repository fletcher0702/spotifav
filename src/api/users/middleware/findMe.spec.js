import { expect } from 'chai';
import findMe from './findMe';

describe('api > lists > middleware > findMe ', () => {
  it('should export a function', () => {
    expect(findMe).to.be.a('function');
  });
});
