import { expect } from 'chai';
import findUser from './login';

describe('api > users > middleware > findUser ', () => {
  it('should export a function', () => {
    expect(findUser).to.be.a('function');
  });
});
