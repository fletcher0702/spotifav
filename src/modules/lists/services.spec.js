import sinon from 'sinon';
import { expect } from 'chai';
import services from './services';
import clients from '../../clients';

describe('modules > Lists > services', () => {
  let mongodbSpy;
  const db = {
    collection: sinon.spy(() => db),
    insertOne: sinon.spy(() => ({
      ops: [
        {
          todo: true,
        },
      ],
    })),
  };


  beforeEach(() => {
    mongodbSpy = sinon.stub(clients, 'mongodb').resolves(db);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should works', () => {
    const data = {
      name: 'A great list name',
    };
    return services.createOne(data).then((result) => {
      expect(result.todo).to.equal(true);

      expect(db.collection.callCount).to.equal(1);
      expect(db.insertOne.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });
});
