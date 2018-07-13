import { expect } from 'chai';
import findOne from './findOne';

describe('api > lists > middleware > findOne ', () => {
  it('should export a function', () => {
    expect(findOne).to.be.a('function');
  });
});
