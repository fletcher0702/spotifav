/* eslint-disable max-len,padded-blocks,no-trailing-spaces,no-multiple-empty-lines */
import chai, { expect } from 'chai';
// import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import findAllFavorites from './findAllFavorites';
// import usersServices from '../../../modules/users/services';
// import favoritesServices from '../../../modules/favoris/services';

chai.use(sinonChai);

describe('api > albums > middleware > createOne ', () => {
  // let createOneStub;
  // const req = {
  //   body: {
  //     data: 'data',
  //     email: sinon.spy(),
  //     password: sinon.spy(),
  //     confirmedPassword: sinon.spy(),
  //   },
  // };


  // let res;
  // let next;
  // let createOneStub;

  // beforeEach(() => {
  //   res = {
  //     send: sinon.spy(),
  //   };
  //   next = sinon.spy();
  //   createOneStub = sinon.stub(favoritesServices, 'createOne');
  // });

  it('should export a function', () => {
    expect(findAllFavorites).to.be.a('function');
  });

  it('should works', () => {

  });

});
