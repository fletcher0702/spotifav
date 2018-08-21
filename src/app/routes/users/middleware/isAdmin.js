import userServices from '../../../../modules/users/services';

export default function (request, response, next) {
  const isLogged = request.isAuthenticated();

  if (!isLogged) {
    response.redirect('/');
  }

  const mail = request.user.email;

  return userServices
    .isAdmin(mail)
    .then((isAdmin) => {
      if (isAdmin) {
        next();
      } else {
        response.redirect('/');
      }
    })
    .catch(err => err);
}
