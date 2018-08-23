import joi from 'joi';
import { expect } from 'chai';
import model, { modelForUpdate } from './models';

describe('modules > Users > model', () => {
  const validData = {
    email: 'john.doe@gmail.com',
    password: 'azerty',
  };

  const validUpdateData = {
    email: 'john.doe@gmail.com',
    password: 'azerty',
  };

  const unvalidData = {
    anotherKey: '12345',
  };

  it('should be a joi schema', () => {
    expect(model).to.be.an('object');
  });

  it('should not works', (done) => {
    joi.validate(unvalidData, model).catch(() => {
      done();
    });
  });

  it('should not works, modelForUpdate', (done) => {
    joi.validate(unvalidData, modelForUpdate).catch(() => {
      done();
    });
  });

  it('should works', () => joi.validate(validData, model));

  it('should works, modelForUpdate', () => joi.validate(validUpdateData, modelForUpdate));
});
