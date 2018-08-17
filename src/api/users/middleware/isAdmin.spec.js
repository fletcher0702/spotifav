import { expect } from 'chai';
import isAdmin from './isAdmin';

describe('api > lists > middleware > isAdmin ', () => {
  it('should export a function', () => {
    expect(isAdmin).to.be.a('function');
  });
});
