import { expect } from 'chai';
import updateOne from './updateOne';

describe('api > users > middleware > updateOne ', () => {
  it('should export a function', () => {
    expect(updateOne).to.be.a('function');
  });
});
