import joi from 'joi';
import { expect } from 'chai';
import model from './models';

describe('modules > favoris > model', () => {
  const validData = {
    userId: '5b290b4fb4fe1f7e5fc5836f',
    albumId: 'okzdncuyyse',
    name: 'A great list',
  };

  const invalidData = {
    anotherKey: '12345',
  };

  it('should be a joi schema', () => {
    expect(model).to.be.an('object');
  });

  it('should not works', (done) => {
    joi.validate(invalidData, model).catch(() => {
      done();
    });
  });

  it('should works', () => joi.validate(validData, model));
});
