/* eslint-disable consistent-return,no-trailing-spaces */

import usersServices from '../../../../modules/users/services';

// Constants
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function (req, res) {
  // Params
  const mail = req.body.email;
  const pwd = req.body.password;
  const confirmedPwd = req.body.confirmedPassword;
  const signupView = 'signup';

  if (mail == null || pwd == null || confirmedPwd == null) {
    res.render(signupView, { errorMessage: true, message: 'Champ(s) Vide(s)  !' });
  }

  if (pwd !== confirmedPwd) {
    res.render(signupView, { errorMessage: true, message: 'Mots de passe différents  !' });
  }

  // Deleting confirmation password field
  delete req.body.confirmedPassword;

  if (!EMAIL_REGEX.test(mail)) {
    res.render(signupView, { errorMessage: true, message: 'Email invalide !' });
  }
  return usersServices
    .findOne(mail)
    .then((userFound) => {
      if (userFound === null) {
        return usersServices
          .createOne(req.body)
          .then(createdUser => createdUser)
          .catch(err => err);
      }
    })
    .catch(err => err);
}
