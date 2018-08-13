import jwtUtils from '../../../utils/jwt.utils';
import userServices from '../../../../modules/users/services';

export default function (request, response) {

  if ( app.locals.login && ( app.locals.jwtToken !== null )){

    const headerAuth = app.locals.jwtToken;
    const userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) return response.render('profil', { message: 'Vous n\'êtes pas autorisé à accéder !' });

    return response.render('profil', { message: 'autorisé à accéder !' });
  }else {
    return response.render('profil', { message: 'Vous n\'êtes pas autorisé à accéder !' });
  }

  /*return userServices
    .findOneById(userId)
    .then((userFound) => {
      if (userFound !== null) {
        return userFound;
      }

      return null;
    });*/
}
