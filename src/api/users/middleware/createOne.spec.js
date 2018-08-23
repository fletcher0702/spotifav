/* eslint-disable max-len,padded-blocks */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import createOne from './createOne';

chai.use(sinonChai);

describe('api > users > middleware > createOne ', () => {
  // let createOneStub;
  const req = {
    body: {
      data: 'data',
      email: sinon.spy(),
      password: sinon.spy(),
      confirmedPassword: sinon.spy(),
    },
  };


  afterEach(() => {
    req.query = {};
    sinon.restore();
  });

  it('should export a function', () => {
    expect(createOne).to.be.a('function');
  });

  it('should works', () => {
    expect(createOne).to.be.a('function');
  });


});
