import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import deleteMe from './deleteMe';

chai.use(sinonChai);

describe('api > users > middleware > deleteMe', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should be a function', () => {
    expect(deleteMe).to.be.a('function');
  });
});
