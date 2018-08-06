import joi from 'joi';

const model = joi.object().keys({
  userId: joi.string().required(),
  name: joi.string().required(),
  description: joi.string(),
  completed: joi.boolean().default(false),
});

export const modelForUpdate = joi.object().keys({
  name: joi.string(),
  description: joi.string(),
  completed: joi.boolean(),
});

export default model;
