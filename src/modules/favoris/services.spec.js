/* eslint-disable semi */
import sinon from 'sinon';
import { expect } from 'chai';
import services from './services';
import clients from '../../clients';

describe('modules > Users > services', () => {
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
    findOne: sinon.spy(() => ({
      ops: [
        {
          todo: true,
        },
      ],
    })),
    updateOne: sinon.spy(() => ({
      ops: [
        {
          todo: true,
        },
      ],
    })),
    deleteOne: sinon.spy(() => ({
      ops: [
        {
          todo: true,
        },
      ],
    })),
    remove: sinon.spy(() => ({
      ops: [
        {
          todo: true,
        },
      ],
    })),
    find: sinon.spy(() => ({
      ops: [
        {
          todo: true,
        },
      ],
      toArray: sinon.spy(() => ({
        ops: [
          {
            todo: true,
          },
        ],
      })),
      skip: sinon.spy(() => ({
        ops: [
          {
            todo: true,
          },
        ],
        limit: sinon.spy(() => ({
          ops: [
            {
              todo: true,
            },
          ],
          toArray: sinon.spy(() => ({
            ops: [
              {
                todo: true,
              },
            ],
          })),
        })),
      })),
    })),

  };


  beforeEach(() => {
    mongodbSpy = sinon.stub(clients, 'mongodb').resolves(db);
  });

  afterEach(() => {
    sinon.restore();
    mongodbSpy.restore();
  });

  it('should works, createOne', () => {
    const data = {
      userId: 'jkjeeoisudnzrhsd',
      albumId: 'jndjnczie',
    };
    return services.createOne(data.userId, data).then((result) => {
      expect(result.todo).to.equal(true);

      expect(db.collection.callCount).to.equal(1);
      expect(db.insertOne.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });

  it('should works, test deleteAssociatedFavorites', () => {
    const userId = 'tesjnunsdnczry';

    return services.deleteAssociatedFavorites(userId).then(() => {
      expect(db.collection.callCount).to.equal(1);
      expect(db.remove.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });

  it('should works, test findOneById', () => {
    const data = {
      id: '5b79b4ce95b3345c3c9c903a',
    };

    return services.findOneById(data.id).then((result) => {
      expect(result.todo).to.equal(true);

      expect(db.collection.callCount).to.equal(1);
      expect(db.findOne.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });

  it('should works, test deleteOne', () => {
    const userId = 'testjjs';
    const id = 'kksdiisdv';

    return services.deleteOne(userId, id).then(() => {
      expect(db.collection.callCount).to.equal(1);
      expect(db.deleteOne.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });

  it('should works, test find', () => {
    return services.find().then((results) => {
      expect(results).to.not.equal(null);
      expect(db.collection.callCount).to.equal(1);
      expect(db.find.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });

  it('should works, test findAll', () => {
    return services.findAll().then((results) => {
      expect(results).to.not.equal(null);
      expect(db.collection.callCount).to.equal(1);
      expect(db.find.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });

  it('should works, test findExceptCurrent', () => {
    const email = 'test@test.fr';
    return services.findExceptCurrent(email).then(() => {
      expect(db.collection.callCount).to.equal(1);
      expect(db.findOne.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });

  it('should works, test findOne', () => {
    const userId = 'testjjs';
    const id = 'kksdiisdv';
    return services.findUser(userId, id).then(() => {
      expect(db.collection.callCount).to.equal(1);
      expect(db.findOne.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });

  it('should works, test findOneByAlbumId', () => {
    const userId = 'testjjs';
    const id = 'kksdiisdv';
    return services.findOneByAlbumId(userId, id).then(() => {
      expect(db.collection.callCount).to.equal(1);
      expect(db.findOne.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });

  it('should works, test isAdmin', () => {
    const email = 'test@test.fr';
    return services.isAdmin(email).then(() => {
      expect(db.collection.callCount).to.equal(1);
      expect(db.findOne.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });
});
