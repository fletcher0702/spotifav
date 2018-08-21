import bcrypt from 'bcrypt';
import jwtUtils from '../../../utils/jwt.utils';
import usersServices from '../../../modules/users/services';

export default function (req, res) {
  const mail = req.body.email;
  const pwd = req.body.password;


  if (mail === null || pwd === null) {
    res.status(401).json({ message: 'Champ(s) vide(s) ' });
    res.send();
  }


  usersServices
    .findUser(mail, pwd)
    .then((userFound) => {
      if (userFound === null) {
        res.status(401).json({ message: 'Identifiants incorrects !' });
        res.send();
      }

      if (!bcrypt.compareSync(pwd, userFound.password)) {
        res.status(401).json({ message: 'Identifiants incorrects !' });
        res.send();
      }

      const accessToken = jwtUtils.generateTokenForUser(userFound);
      res.status(201).json({ message: 'Vous avez bien été authentifié ! Récupérez votre token', token: accessToken });
      res.send();
    })
    .catch(err => err);
}
