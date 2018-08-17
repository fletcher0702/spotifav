import { expect } from 'chai';
import findUser from './login';

describe('api > lists > middleware > findUser ', () => {
  it('should export a function', () => {
    expect(findUser).to.be.a('function');
  });
});
