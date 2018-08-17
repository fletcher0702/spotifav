import joi from 'joi';

const model = joi.object().keys({
  userId: joi.string().required(),
  albumId: joi.string().required(),
  name: joi.string(),

});

export default model;
