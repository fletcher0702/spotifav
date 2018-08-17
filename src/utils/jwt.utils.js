import jwt from 'jsonwebtoken';

const JWT_SIGN_SECRET = '<jwt_secret>';

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

};
