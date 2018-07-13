import joi from 'joi';
import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import clients from '../../clients';
import model, { modelForUpdate } from './models';
import errors from '../../enums/errors';


class UsersServices {
  constructor(collectionName) {
    this.COLLECTION_NAME = collectionName;
  }

  createOne(data) {
    // Mr j'ai pas trouver la bonne syntax pour modifier l'object
    // J'ai même essayer un object spread

    const testValidate = joi.validate(data, model);
    testValidate.value.password = sha1(testValidate.value.password);
    // const modifiedValidatedData = {
    //   ...testValidate,
    //   password: 'le mot de pass modifié',
    //
    // };


    console.log(testValidate.value.password);
    console.log(sha1);
    console.log(`tester : ${testValidate.firstName}`);


    return joi.validate(data, model).then(validatedData => clients.mongodb()
      .then(db => db.collection(this.COLLECTION_NAME).insertOne(validatedData))
      .then(response => response.ops[0]));
  }

  deleteOne(id) {
    return joi.validate(id, joi.string().required())
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).deleteOne({ _id: ObjectId(id) }))
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

  findOne(id) {
    return joi.validate(id, joi.string().required())
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).findOne({ _id: ObjectId(id) }))
      .then((list) => {
        if (!list) throw errors.notFound();
        return list;
      });
  }

  updateOne(id, data) {
    return joi.validate(id, joi.string().required())
      .then(() => joi.validate(data, modelForUpdate))
      .then((validatedData) => {
        return clients.mongodb()
          .then(db => db
            .collection(this.COLLECTION_NAME)
            .updateOne(
              { _id: ObjectId(id) },
              { $set: validatedData },
            ));
      })
      .then((response) => {
        if (response.matchedCount === 0) throw errors.notFound();

        return response;
      })
      .then(() => this.findOne(id));
  }
}

export default new UsersServices('users');
