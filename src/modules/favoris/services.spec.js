import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import services from './services';
import clients from '../../clients';
import listsServices from '../lists/services';

chai.use(sinonChai);

describe('modules > Tasks > services', () => {
  let mongodbSpy;
  let listsFindOneStub;
  const db = {
    collection: sinon.spy(() => db),
    insert: sinon.spy(() => ({
      ops: [
        {
          todo: true,
        },
      ],
    })),
  };


  beforeEach(() => {
    mongodbSpy = sinon.stub(clients, 'mongodb').resolves(db);
    listsFindOneStub = sinon.stub(listsServices, 'findOne');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should works', () => {
    const data = {
      name: 'A great task name',
    };
    listsFindOneStub.resolves({});

    return services.createOne('123456', data).then((result) => {
      expect(result.todo).to.equal(true);

      expect(db.collection).to.have.been.called;
      expect(db.insert).to.have.been.called;
      expect(mongodbSpy).to.have.been.called;
      expect(listsFindOneStub).to.have.been.called;
    });
  });
});
