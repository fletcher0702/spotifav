import jwt from 'jsonwebtoken';

const JWT_SIGN_SECRET = 'MyS3cr3tK3Y';

module.exports = {
  generateTokenForUser(userData) {
    return jwt.sign({
      userId: userData._id.toString(),
      isAdmin: userData.isAdmin,
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1h',
    });
  },
  parseAuthorization(authorization) {
    return (authorization != null) ? authorization.replace('bearer ', '') : null;
  },
  getUserId(authorization) {
    let id = -1;
    const token = module.exports.parseAuthorization(authorization);

    if (token !== null) {

      jwt.verify(token, JWT_SIGN_SECRET)
        .then((err, decoded) => {
          id = decoded.userId;
          console.log(decoded.userId);
        })
        .catch(err => err);
    }
    return id;
  },


};
