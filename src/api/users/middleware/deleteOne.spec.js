import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import deleteOne from './deleteOne';

chai.use(sinonChai);

describe('api > users > middleware > deleteOne', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should be a function', () => {
    expect(deleteOne).to.be.a('function');
  });
});
