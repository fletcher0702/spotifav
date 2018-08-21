/* eslint-disable max-len */
import { ObjectId } from 'mongodb';
import joi from 'joi';
import clients from '../../clients';
import model from './models';
import usersServices from '../users/services';


class FavorisServices {
  constructor(collectionName) {
    this.COLLECTION_NAME = collectionName;
  }

  createOne(userId, data) {
    const favoriteData = {
      ...data,
      userId,
    };
    return joi.validate(favoriteData, model)
      .then((validatedData) => {
        return usersServices.findOne(userId).then(() => {
          return clients.mongodb()
            .then(db => db.collection(this.COLLECTION_NAME).insert(validatedData))
            .then(response => response.ops[0]);
        });
      });
  }


  deleteAssociatedFavorites(userIdCandidate) {
    const parametersSchema = joi.object().keys({
      userIdCandidate: joi.string().required(),
    });

    return joi.validate({ userIdCandidate }, parametersSchema)
      .then(usersServices.findOneById(userIdCandidate))
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).remove({ userId: userIdCandidate }))
      .then((response) => {
        return response.deletedCount;
      });
  }

  deleteOne(userIdCandidate, id) {
    const parametersSchema = joi.object().keys({
      id: joi.string().required(),
      userIdCandidate: joi.string().required(),
    });

    return joi.validate({ id, userIdCandidate }, parametersSchema)
      .then(usersServices.findOne(userIdCandidate))
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).deleteOne({ _id: ObjectId(id), userId: userIdCandidate }))
      .then((response) => {
        return response.deletedCount;
      });
  }

  find(userId, first = 20, offset = 0, term) {
    return joi.validate(userId, joi.string().required())
      .then(() => {
        return usersServices.findOne(userId).then(() => {
          return clients.mongodb()
            .then((db) => {
              return db
                .collection(this.COLLECTION_NAME)
                .find(term ? { userId, $text: { $search: term } } : { userId })
                .skip(offset)
                .limit(first)
                .toArray();
            });
        });
      });
  }

  findAll(first = 20, offset = 0) {
    return clients.mongodb()
      .then((db) => {
        return db
          .collection(this.COLLECTION_NAME)
          .find()
          .skip(offset)
          .limit(first)
          .toArray();
      });
  }


  findOne(userId, favoriteId) {
    const parametersSchema = joi.object().keys({
      userId: joi.string().required(),
      favoriteId: joi.string().required(),
    });

    return joi.validate({ userId, favoriteId }, parametersSchema)
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).findOne({ _id: ObjectId(favoriteId), userId }))
      .then((favorite) => {
        // if (!favorite) throw errors.notFound();
        return favorite;
      });
  }

  findOneByAlbumId(userId, albumIdCandidate) {
    const parametersSchema = joi.object().keys({
      userId: joi.string().required(),
      albumIdCandidate: joi.string().required(),
    });

    return joi.validate({ userId, albumIdCandidate }, parametersSchema)
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).findOne({ albumId: albumIdCandidate, userId }))
      .then((albumFound) => {
        return albumFound;
      });
  }
}

export default new FavorisServices('favorites');
