
import userServices from '../../../../modules/users/services';
import app from '../../../../app';

export default function (request, response) {
  request.body.email = request.user.email;


  const mail = request.user.email;

  return userServices
    .updateOne(mail, request.body)
    .then(updateRes => response.redirect(app.locals.profil))
    .catch(err => err);
}

export const passwordUpdate = function (request, response) {
  const mail = request.user.email;
  const pwd = request.body.password;
  const confirmedPwd = request.body.confirmedPassword;

  if (pwd === '' || confirmedPwd === '') response.render(app.locals.views.profil, { errorMessage: true, message: 'Champ(s) vide(s)' });

  if (pwd !== confirmedPwd) response.render(app.locals.views.profil, { errorMessage: true, message: 'Erreur mot de passe différents' });

  delete request.body.confirmedPassword;
  request.body.email = mail;
  return userServices
    .updateOnePassword(mail, request.body)
    .then(res => response.render(app.locals.views.profil, { errorMessage: false, message: 'Mot de passe mis à jour !' }))
    .catch(err => err);
};
