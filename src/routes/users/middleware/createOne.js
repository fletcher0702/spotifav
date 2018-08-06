import usersServices from '../../../modules/users/services';

export default function (req, res, next) {
  const pwd = req.body.password;
  const confirmedPassword = req.body.confirmedpwd;
  const mail = req.body.email;


  if (mail == null) return next(400);

  const bool = (pwd === confirmedPassword);

  if (bool) {
    delete req.body.confirmedpwd;

    return usersServices
      .createOne(req.body)
      .then((response) => {
        console.log(response);
        res.redirect('/');
      })
      .catch(err => next(err));
  }
  return next(Error('Mots de passe différents!'));
}
