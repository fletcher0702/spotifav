import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import usersServices from '../../../modules/users/services';
import deleteMe from './deleteMe';

chai.use(sinonChai);

describe('api > lists > middleware > deleteMe', () => {
  let usersServicesDeleteMeStub;

  afterEach(() => {
    sinon.restore();
  });

  beforeEach(() => {
    usersServicesDeleteMeStub = sinon.stub(usersServices, 'deleteMe');
  });

  it('should be a function', () => {
    expect(deleteMe).to.be.a('function');
  });

  it('should call deleteMe service with req.params.id and call res.send', () => {
    const response = {
      data: true,
    };
    const req = {
      params: {
        id: '12345',
      },
    };
    const res = {
      send: sinon.spy(),
    };
    const next = sinon.spy();

    usersServicesDeleteMeStub.resolves(response);

    return deleteMe(req, res, next).then(() => {
      expect(res.send).to.have.been.called;
      expect(next).not.to.have.been.called;
      expect(usersServicesDeleteMeStub).to.have.been.called;
    });
  });

  it('should call deleteMe service with req.params.id and call next if error', () => {
    const req = {
      params: {
        id: '12345',
      },
    };
    const res = {
      send: sinon.spy(),
    };
    const next = sinon.spy();
    usersServicesDeleteMeStub.rejects();

    return deleteMe(req, res, next).then(() => {
      expect(res.send).not.to.have.been.called;
      expect(next).to.have.been.called;
      expect(usersServicesDeleteMeStub).to.have.been.called;
    });
  });
});
