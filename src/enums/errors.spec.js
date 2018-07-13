import { expect } from 'chai';
import errors from './errors';

describe('enums > errors', () => {
  it('should export an object', () => {
    expect(errors).to.be.an('object');
  });

  describe('notFound', () => {
    it('should return an error', () => {
      const error = errors.notFound();

      expect(error.message).to.equal('Not Found');
      expect(error.status).to.equal(404);
    });
  });
});
