import bcrypt from 'bcrypt';
import userServices from '../../../../modules/users/services';
import jwtUtils from '../../../utils/jwt.utils';


export default function (request, response) {
  const mail = request.body.email;
  const pwd = request.body.password;

  console.log(`Email : ${mail}`);

  if (mail == null || pwd == null) {
    return response.send(400);
  }

  return userServices
    .findOne(mail)
    .then((userFound) => userFound)
    .catch(err => err);
}
