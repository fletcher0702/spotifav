import usersServices from '../../../modules/users/services';

export default function (req, res, done) {

  usersServices
    .findOneById(req.user.userId)
    .then((userFound) => {
      const admin = userFound.isAdmin;

      if (admin) done(null, true);
      else {
        res.status(401).json({ message: 'accès interdit ! ' });
      }
    })
    .catch(err => err);
}
