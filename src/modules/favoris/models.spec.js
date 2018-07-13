import joi from 'joi';
import { expect } from 'chai';
import model from './models';

describe('modules > Tasks > model', () => {
  const validData = {
    listId: '5b290b4fb4fe1f7e5fc5836f',
    name: 'A great list',
    description: 'A great description',
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

  it('should works', () => joi.validate(validData, model));
});
