import joi from 'joi';

const model = joi.object().keys({
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().required(),
  password: joi.string().required(),
  isAdmin: joi.boolean(),
});

export const modelForUpdate = joi.object().keys({
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().required(),
  password: joi.string(),
});

export default model;
