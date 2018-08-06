import joi from 'joi';

const model = joi.object().keys({
  firstname: joi.string(),
  lastname: joi.string(),
  email: joi.string().required(),
  password: joi.string().required(),
  isAdmin: joi.boolean(),
});

export const modelForUpdate = joi.object().keys({
  firstname: joi.string(),
  lastname: joi.string(),
  email: joi.string().required(),
  password: joi.string(),
});

export default model;
