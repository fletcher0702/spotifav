import jwtUtils from '../../../utils/jwt.utils';
import usersServices from '../../../modules/users/services';

export default function (req, res) {
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
      if (userFound !== null) {
        res.status(401).json({ message: 'Le mail existe déjà ! Désolé :-( ' });
      } else {
        return usersServices
          .createOne(req.body)
          .then((createdUser) => {
            const accessToken = jwtUtils.generateTokenForUser(createdUser);

            res.status(201).json({
              message: 'l\'utilisateur a bien été créé, récupérez votre token',
              token: accessToken,
            });
          })
          .catch(() => res.status(401).json({ message: 'Problème lors de la création de l\'utilisateur' }));
      }
    });
}
