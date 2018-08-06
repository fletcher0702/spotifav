import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import notFound from './notFound';

chai.use(sinonChai);

describe('middleware > notFound', () => {
  it('should be a function', () => {
    expect(notFound).to.be.a('function');
  });

  it('should call next with an error', () => {
    const next = sinon.spy();
    const req = {
      url: '/api',
    };

    notFound(req, null, next);

    expect(next).to.have.been.called;
    expect(next.args[0][0].status).to.equal(404);
  });
});
