import joi from 'joi';
import sha1 from 'sha1';
import clients from '../../clients';
import model, { modelForUpdate } from './models';
import errors from '../../enums/errors';


class UsersServices {
  constructor(collectionName) {
    this.COLLECTION_NAME = collectionName;
  }

  createOne(data) {
    if (this.findOne(data.email)) throw errors.alreadyExist();
    const testValidate = joi.validate(data, model);
    testValidate.value.password = sha1(testValidate.value.password);
    return joi.validate(data, model).then(validatedData => clients.mongodb()
      .then(db => db.collection(this.COLLECTION_NAME).insertOne(validatedData))
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

  find(first = 20, offset = 0, term) {
    return clients.mongodb()
      .then((db) => {
        return db
          .collection(this.COLLECTION_NAME)
          .find(term ? { $text: { $search: term } } : null)
          .skip(offset)
          .limit(first)
          .toArray();
      });
  }

  findOne(userEmail) {
    return joi.validate(userEmail, joi.string().required())
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).findOne({ email: userEmail }))
      .then((list) => {
        if (!list) throw errors.notFound();
        return list;
      });
  }

  findUser(userEmail, userPassword) {
    return joi.validate(userEmail, joi.string().required())
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME)
        .findOne({ email: userEmail, password: userPassword }))
      .then((user) => {
        if (!user) throw errors.notFound();
        return user;
      });
  }

  updateOne(userEmail, data) {
    if (this.findOne(data.email)) throw errors.alreadyExist();
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
}

export default new UsersServices('users');
