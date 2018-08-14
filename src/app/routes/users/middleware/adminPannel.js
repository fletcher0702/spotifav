import userServices from '../../../../modules/users/services';

export default function (request, response) {
  return userServices
    .find()
    .then((getUsers) => {
      // console.log(getUsers);
      response.locals.users = getUsers;
      const userTest = getUsers[0].email;
      response.render('adminPannel', { user: userTest});
    })
    .catch(err => err);
}
