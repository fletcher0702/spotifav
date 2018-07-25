import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import setHeaders from './setHeaders';

chai.use(sinonChai);

describe('api > middleware > setHeaders', () => {
  let res;
  let next;

  beforeEach(() => {
    res = {
      set: sinon.spy(),
    };
    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should export a function', () => {
    expect(setHeaders).to.be.a('function');
  });

  it('should set content-type as application', () => {
    setHeaders({}, res, next);
    expect(res.set).to.have.been.called;
    expect(next).to.have.been.called;
  });
});
