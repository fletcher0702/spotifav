/* eslint-disable no-param-reassign */
import joi from 'joi';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import clients from '../../clients';
import model, { modelForUpdate, modelForPasswordUpdate } from './models';
import errors from '../../enums/errors';


class UsersServices {
  constructor(collectionName) {
    this.COLLECTION_NAME = collectionName;
  }

  createOne(data) {
    data.password = bcrypt.hashSync(data.password, 8);

    return joi.validate(data, model).then(validatedData => clients.mongodb()
      .then((db) => {
        return db.collection(this.COLLECTION_NAME).insertOne(validatedData);
      })
      .then(response => response.ops[0]));
  }

  deleteOne(userEmail) {
    return joi.validate(userEmail, joi.string().required())
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).deleteOne({ email: userEmail }))
      .then((response) => {
        if (response.deletedCount === 0) throw errors.notFound();

        return response;
      });
  }

  find(first = 20, offset = 0) {
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

  findExceptCurrent(email) {
    return clients.mongodb()
      .then((db) => {
        return db
          .collection(this.COLLECTION_NAME)
          .find({ email: { $ne: email } })
          .toArray();
      });
  }

  findOne(userEmail) {
    return joi.validate(userEmail, joi.string().required())
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).findOne({ email: userEmail }))
      .then((user) => {
        return user;
      });
  }

  findOneById(id) {
    return joi.validate(id, joi.string().required())
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).findOne({ _id: ObjectId(id) }))
      .then((userFound) => {
        return userFound;
      });
  }

  findUser(userEmail) {
    return joi.validate(userEmail, joi.string().required())
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME)
        .findOne({ email: userEmail }))
      .then((user) => {
        return user;
      });
  }

  updateOne(userEmail, data) {
    return joi.validate(userEmail, joi.string().required())
      .then(() => joi.validate(data, modelForUpdate))
      .then((validatedData) => {
        return clients.mongodb()
          .then(db => db
            .collection(this.COLLECTION_NAME)
            .updateOne(
              { email: userEmail },
              { $set: validatedData },
            ));
      })
      .then((response) => {
        if (response.matchedCount === 0) throw errors.notFound();

        return response;
      })
      .then(() => this.findOne(userEmail));
  }

  updateOnePassword(userEmail, data) {
    data.password = bcrypt.hashSync(data.password, 8);
    return joi.validate(userEmail, joi.string().required())
      .then(() => joi.validate(data, modelForPasswordUpdate))
      .then((validatedData) => {
        return clients.mongodb()
          .then(db => db
            .collection(this.COLLECTION_NAME)
            .updateOne(
              { email: userEmail },
              { $set: validatedData },
            ));
      })
      .then((response) => {
        if (response.matchedCount === 0) throw errors.notFound();

        return response;
      })
      .then(() => this.findOne(userEmail));
  }

  isAdmin(userEmail) {
    return joi.validate(userEmail, joi.string().required())
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).findOne({ email: userEmail }))
      .then((user) => {
        return user.isAdmin;
      });
  }
}

export default new UsersServices('users');
