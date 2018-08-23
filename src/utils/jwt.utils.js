/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';

const JWT_SIGN_SECRET = process.env.JWT_SECRET;

export const cfg = {
  jwtSecret: JWT_SIGN_SECRET,
  jwtSession: {
    session: false,
  },
};
export default {
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
