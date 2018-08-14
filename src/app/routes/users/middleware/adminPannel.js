import userServices from '../../../../modules/users/services';

export default function (request, response) {
  const id = request.user._id;

  return userServices
    .findExceptCurrent(id)
    .then((getUsers) => {
      response.locals.users = getUsers;
      const userTest = getUsers[0].email;
      console.log('Before\n\n');
      console.log(getUsers);

      response.render('adminPannel');
    })
    .catch(err => err);
}

export const deleteUserById = function (request, response) {
  const id = request.query.id;
  const adminPannelLink = '/admin/pannel/';
  if (id !== '') {
    userServices
      .findOneById(id)
      .then((userFound) => {
        if (userFound !== null) {
          return userServices
            .deleteOne(userFound.email)
            .then(res => {
              response.redirect(adminPannelLink);
              done(null, false);
            })
            .catch(err => err);
        }
        response.redirect(adminPannelLink);
      });
  } else {
    response.redirect('/');
  }
};
