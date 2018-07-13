import { ObjectId } from 'mongodb';
import joi from 'joi';
import clients from '../../clients';
import model, { modelForUpdate } from './models';
import errors from '../../enums/errors';
import listsServices from '../lists/services';

const COLLECTION_NAME = 'tasks';

function createOne(listId, data) {
  const taskData = {
    ...data,
    listId,
  };
  return joi.validate(taskData, model)
    .then((validatedData) => {
      return listsServices.findOne(listId).then(() => {
        return clients.mongodb()
          .then(db => db.collection(COLLECTION_NAME).insert(validatedData))
          .then(response => response.ops[0]);
      });
    });
}

function find(listId, first = 20, offset = 0, term) {
  return joi.validate(listId, joi.string().required())
    .then(() => {
      return listsServices.findOne(listId).then(() => {
        return clients.mongodb()
          .then((db) => {
            return db
              .collection(COLLECTION_NAME)
              .find(term ? { listId, $text: { $search: term } } : { listId })
              .skip(offset)
              .limit(first)
              .toArray();
          });
      });
    });
}

function findOne(listId, taskId) {
  const parametersSchema = joi.object().keys({
    listId: joi.string().required(),
    taskId: joi.string().required(),
  });

  return joi.validate({ listId, taskId }, parametersSchema)
    .then(() => clients.mongodb())
    .then(db => db.collection(COLLECTION_NAME).findOne({ _id: ObjectId(taskId), listId }))
    .then((task) => {
      if (!task) throw errors.notFound();
      return task;
    });
}

function deleteOne(listId, id) {
  const parametersSchema = joi.object().keys({
    id: joi.string().required(),
    listId: joi.string().required(),
  });

  return joi.validate({ id, listId }, parametersSchema)
    .then(listsServices.findOne(listId))
    .then(() => clients.mongodb())
    .then(db => db.collection(COLLECTION_NAME).deleteOne({ _id: ObjectId(id), listId }))
    .then((response) => {
      if (response.deletedCount === 0) throw errors.notFound();
      return response;
    });
}

function updateOne(listId, taskId, data) {
  const parametersSchema = joi.object().keys({
    listId: joi.string().required(),
    taskId: joi.string().required(),
  });

  return joi.validate({ listId, taskId }, parametersSchema)
    .then(() => joi.validate(data, modelForUpdate))
    .then((validatedData) => {
      return listsServices.findOne(listId).then(() => {
        return clients.mongodb()
          .then(db => db
            .collection(COLLECTION_NAME)
            .updateOne(
              { _id: ObjectId(taskId) },
              { $set: validatedData },
            ))
          .then((response) => {
            if (response.matchedCount === 0) throw errors.notFound();

            return response;
          });
      });
    })
    .then(() => findOne(listId, taskId));
}

export default {
  createOne,
  deleteOne,
  find,
  findOne,
  updateOne,
};
