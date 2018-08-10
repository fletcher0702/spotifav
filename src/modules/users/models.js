import joi from 'joi';

const model = joi.object().keys({
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  isAdmin: joi.boolean().default(false),
});

export const modelForUpdate = joi.object().keys({
  firstName: joi.string(),
  lastName: joi.string(),
  password: joi.string(),
});

export default model;
