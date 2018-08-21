import bcrypt from 'bcrypt';
import userServices from '../../../../modules/users/services';

export default function (request, email, password, done) {
  userServices
    .findOne(email)
    .then((user) => {
      if (user !== null) {
        const hash = user.password;

        bcrypt.compare(password, hash, (err, res) => {
          if (err) done(null, false);

          done(null, user);
          console.log(res);
        });
      } else {
        done(null, false);
      }
    }).catch(err => err);
}

export const isLogged = function (request, response, next) {
  if (request.isAuthenticated()) next();
  else response.redirect('/login');
};
