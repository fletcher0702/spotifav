import { expect } from 'chai';
import sinon from 'sinon';
import { MongoClient } from 'mongodb';

import mongodb from './mongodb';

describe('clients > mongodb', () => {
  let mongoConnectStub;

  beforeEach(() => {
    mongoConnectStub = sinon.stub(MongoClient, 'connect');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should export a function', () => {
    expect(mongodb).to.be.a('function');
  });

  it('should return a promise', () => {
    expect(mongodb().then).to.be.a('function');
  });

  it('should return a client set on database', () => {
    const db = sinon.stub().returns('hello');
    mongoConnectStub.yields(null, { db });

    return mongodb().then((res) => {
      expect(res).to.equal('hello');
      expect(db).to.have.been.calledWith('todo-exterminator');
    });
  });

  it('should reject if mongo connect return an err', (done) => {
    mongoConnectStub.yields('an error');

    mongodb().catch(() => {
      done();
    });
  });
});
