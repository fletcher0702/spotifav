/* eslint-disable consistent-return */

import usersServices from '../../../../modules/users/services';

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/; */

export default function (req, res) {
  // Params
  const mail = req.body.email;
  const pwd = req.body.password;
  const confirmedPwd = req.body.confirmedPassword;

  if (mail == null || pwd == null || confirmedPwd == null) {
    return res.status(400).json({ error: 'missing parameters' });
  }

  if (pwd !== confirmedPwd) {
    return res.status(400).json({ error: 'different password' });
  }

  // Deleting confirmation password field
  delete req.body.confirmedPassword;

  if (!EMAIL_REGEX.test(mail)) {
    return res.status(400).json({ error: 'email is not valid' });
  }
  return usersServices
    .findOne(mail)
    .then((userFound) => {
      if (userFound === null) {
        return usersServices
          .createOne(req.body)
          .then(createdUser => createdUser)
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
}
