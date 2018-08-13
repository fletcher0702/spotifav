import userServices from '../../../../modules/users/services';

export default function (request, response, next) {
  const isLogged = request.isAuthenticated();

  if (!isLogged) {
    response.redirect('/');
    done(null, false);
  }

  const mail = request.user.email;

  return userServices
    .isAdmin(mail)
    .then((isAdmin) => {
      if (isAdmin) {
        next();
      } else {
        response.redirect('/');
        done(null, false);
      }
    })
    .catch(err => err);
}
