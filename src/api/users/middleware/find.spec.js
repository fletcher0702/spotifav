import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import find from './find';

chai.use(sinonChai);

describe('api > users > middleware > find ', () => {
  it('should export a function', () => {
    expect(find).to.be.a('function');
  });
});
