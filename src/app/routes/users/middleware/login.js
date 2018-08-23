/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import userServices from '../../../../modules/users/services';

export default function (request, email, password, done) {
  userServices
    .findOne(email)
    .then((user) => {
      if (user !== null) {
        console.log(user);
        const hash = user.password;

        bcrypt
          .compare(password, hash)
          .then((res) => {
            console.log(res);
            if (res) done(null, user);
            else done(null, false);
          })
          .catch(err => err);
      } else {
        done(null, false);
      }
    }).catch(err => err);
}

export const isLogged = function (request, response, next) {
  if (request.isAuthenticated()) next();
  else response.redirect('/login');
};
