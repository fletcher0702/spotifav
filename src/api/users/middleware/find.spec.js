import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import find from './find';
import listsServices from '../../../modules/users/services';

chai.use(sinonChai);

describe('api > lists > middleware > find ', () => {
  let res;
  let next;
  let findStub;
  const req = {
    query: {},
  };

  beforeEach(() => {
    res = {
      send: sinon.spy(),
    };
    next = sinon.spy();
    findStub = sinon.stub(listsServices, 'find');
  });

  afterEach(() => {
    req.query = {};
    sinon.restore();
  });

  it('should export a function', () => {
    expect(find).to.be.a('function');
  });

  it('should send the service response', () => {
    const data = {
      an: 'object',
    };
    findStub.resolves(data);

    return find(req, res, next).then(() => {
      expect(findStub).to.have.been.calledWith(NaN, NaN, undefined);
      expect(res.send).to.have.been.calledWith(data);
      expect(next).not.to.have.been.called;
    });
  });

  it('should pass the right parameters from query', () => {
    findStub.resolves({});

    req.query = {
      first: '2',
      offset: '30',
      term: 'search',
      another: 'params',
    };

    return find(req, res, next).then(() => {
      expect(findStub).to.have.been.calledWith(2, 30, 'search');
    });
  });

  it('should next if service is reject', () => {
    const error = {
      name: 'ouups',
    };
    findStub.rejects(error);

    return find(req, res, next).then(() => {
      expect(res.send).not.to.have.been.called;
      expect(next).to.have.been.calledWith(error);
    });
  });
});
