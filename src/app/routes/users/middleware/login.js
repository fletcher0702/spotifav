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

          console.log('Matched password');

          done(null, user);
        });
      } else {
        console.log('Can\'t login');
        done(null, false);
      }
    }).catch(err => err);
}
