import jwtUtils from '../../../utils/jwt.utils';
import usersServices from '../../../modules/users/services';
import cfg from './config';

export default function (req, res, next) {
  const mail = req.body.email;
  const pwd = req.body.password;
  const confirmedPwd = req.body.confirmedPassword;

  if (mail === null || pwd === null || confirmedPwd === null) {
    res.status(401).json({ message: 'Champ(s) vide(s) ' });
    res.send();
  }

  if (pwd !== confirmedPwd) {
    res.status(401).json({ message: 'Mots de passe différents !' });
    res.send();
  }

  delete req.body.confirmedPassword;
  return usersServices
    .findOne(mail)
    .then((userFound) => {
      if (userFound === null) {
        return usersServices
          .createOne(req.body)
          .then((createdUser) => {
            const accessToken = jwtUtils.generateTokenForUser(createdUser);

            // jwt.encode({ id: createdUser._id.toString() }, cfg.jwtSecret);
            res.status(201).json({ message: 'l\'utilisateur a bien été créé, récupérez votre token', token: accessToken });
          })
          .catch(err => res.status(401).json({ message: 'Problème lors de la création de l\'utilisateur' }));
      }

      res.status(401).json({ message: 'Le mail existe déjà ! Désolé :-( ' });
    });
}

// createOne(req.body)
//   .then(response => res.send({
//     token: jwt.encode({ email: response.email, password: req.body.password }, cfg.jwtSecret),
//   }))
//   .catch(err => next(err));
