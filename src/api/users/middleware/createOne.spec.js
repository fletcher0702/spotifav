import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import createOne from './createOne';
import usersServices from '../../../modules/users/services';

chai.use(sinonChai);

describe('api > lists > middleware > find ', () => {
  let res;
  let next;
  let createOneStub;
  const req = {
    body: {
      data: 'data',
    },
  };

  beforeEach(() => {
    res = {
      send: sinon.spy(),
    };
    next = sinon.spy();
    createOneStub = sinon.stub(usersServices, 'createOne');
  });

  afterEach(() => {
    req.query = {};
    sinon.restore();
  });

  it('should export a function', () => {
    expect(createOne).to.be.a('function');
  });

  it('should send the service response', () => {
    const data = {
      an: 'object',
    };
    createOneStub.resolves(data);

    return createOne(req, res, next).then(() => {
      expect(createOneStub).to.have.been.calledWith(req.body);
      expect(res.send).to.have.been.calledWith(data);
      expect(next).not.to.have.been.called;
    });
  });

  it('should next if service is reject', () => {
    const error = {
      name: 'ouups',
    };
    createOneStub.rejects(error);

    return createOne(req, res, next).then(() => {
      expect(res.send).not.to.have.been.called;
      expect(next).to.have.been.calledWith(error);
    });
  });
});
