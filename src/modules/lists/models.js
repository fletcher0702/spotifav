import joi from 'joi';

const model = joi.object().keys({
  name: joi.string().required(),
  description: joi.string(),
});

export const modelForUpdate = joi.object().keys({
  name: joi.string(),
  description: joi.string(),
});

export default model;
