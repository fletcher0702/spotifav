import joi from 'joi';

const model = joi.object().keys({
  userId: joi.string().required(),
  albmumName: joi.string().required(),
  artistFullName: joi.string().required().default("Artiste inconnu"),
  year: joi.string().required(),
});

export const modelForUpdate = joi.object().keys({
  albmumName: joi.string(),
  artistFullName: joi.string(),
  year: joi.string(),
});

export default model;
