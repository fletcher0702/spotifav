
import jwt from 'jsonwebtoken'

export default function(req, res) {

  // Params
  const email    = req.body.email;
  const password = req.body.password;

  if (email == null ||  password == null) {
    return res.status(400).json({ 'error': 'missing parameters' });
  }

  asyncLib.waterfall([
    function(done) {
      models.User.findOne({
        where: { email: email }
      })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
    },
    function(userFound, done) {
      if (userFound) {
        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
          done(null, userFound, resBycrypt);
        });
      } else {
        return res.status(404).json({ 'error': 'user not exist in DB' });
      }
    },
    function(userFound, resBycrypt, done) {
      if(resBycrypt) {
        done(userFound);
      } else {
        return res.status(403).json({ 'error': 'invalid password' });
      }
    }
  ], function(userFound) {
    if (userFound) {
      return res.status(201).json({
        'userId': userFound.id,
        'token': jwtUtils.generateTokenForUser(userFound)
      });
    } else {
      return res.status(500).json({ 'error': 'cannot log on user' });
    }
  });
}
