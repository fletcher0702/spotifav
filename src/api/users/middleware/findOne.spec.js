import { expect } from 'chai';
import findOne from './findOne';

describe('api > users > middleware > findOne ', () => {
  it('should export a function', () => {
    expect(findOne).to.be.a('function');
  });
});
