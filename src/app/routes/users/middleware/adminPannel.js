/* eslint-disable prefer-destructuring,no-unreachable,consistent-return,max-len,no-useless-escape,no-underscore-dangle */
import IdValidator from 'valid-objectid';
import usersServices from '../../../../modules/users/services';
import favoritesServices from '../../../../modules/favoris/services';

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default function (request, response) {
  const email = request.user.email;

  return usersServices
    .findExceptCurrent(email)
    .then((getUsers) => {
      response.locals.users = getUsers;
      favoritesServices.findAll().then((allFavorites) => {
        response.render('adminPannel', { favorites: allFavorites });
      }).catch(err => err);
    })
    .catch(err => err);
}

export const deleteUserById = function (request, response) {
  const id = request.query.id;
  const adminPannelLink = '/admin/pannel/';
  if (IdValidator.isValid(id)) {
    usersServices
      .findOneById(id)
      .then((userFound) => {
        if (userFound !== null) {
          return favoritesServices
            .deleteAssociatedFavorites(userFound._id.toString())
            .then(res => res)
            .catch(err => err);


          return usersServices
            .deleteOne(userFound.email)
            .then(() => {
              response.redirect(adminPannelLink);
            })
            .catch(err => err);
        }
        response.redirect(adminPannelLink);
      });
  } else {
    response.redirect('/admin/pannel/');
  }
};
export const userExist = function (request, response, next) {
  const id = request.query.id;
  const adminPannelLink = '/admin/pannel/';

  if (id === '' || !IdValidator.isValid(id)) {
    response.redirect(adminPannelLink);
  } else {
    return usersServices
      .findOneById(id)
      .then((userFound) => {
        if (userFound === null) {
          response.redirect(adminPannelLink);
        } else {
          next();
        }
      })
      .catch(err => err);
  }
};

export const editUser = function (request, response) {
  const id = request.query.id;
  const adminPannelLink = '/admin/pannel/';
  const editUserView = 'profilUpdate';

  return usersServices
    .findOneById(id)
    .then((userFound) => {
      if (userFound === null) {
        response.redirect(adminPannelLink);
      } else {
        const lastNameUser = userFound.lastName;
        const firstNameUser = userFound.firstName;
        response.render(editUserView, { idUser: id, lastName: lastNameUser, firstName: firstNameUser });
      }
    })
    .catch(err => err);
};

export const updateUserIdentity = function (request, response) {
  const id = request.body.id;
  const adminPannelLink = '/admin/pannel/';

  if (!IdValidator.isValid(id)) {
    response.redirect(adminPannelLink);
  }
  delete request.body.id;

  return usersServices
    .findOneById(id)
    .then((userFound) => {
      if (userFound === null) {
        return null;
      }
      const mail = userFound.email;

      request.body.email = mail;
      usersServices
        .updateOne(mail, request.body)
        .then(() => {
          response.render('profilUpdate', { errorMessage: true, message: 'utilisateur mis à jour !' });
        })
        .catch(err => err);
    })
    .catch(err => err);
};

export const addUser = function (req, res) {
  // Params
  const mail = req.body.email;
  const pwd = req.body.password;
  const confirmedPwd = req.body.confirmedPassword;
  const adminUser = req.body.admin;

  if (adminUser === 'on') {
    req.body.isAdmin = true;
  }

  if (mail == null || pwd == null || confirmedPwd == null) {
    res.status(400).json({ error: 'missing parameters' });
    res.send();
  }

  if (pwd !== confirmedPwd) {
    res.status(400).json({ error: 'different password' });
    res.send();
  }


  if (!EMAIL_REGEX.test(mail)) {
    res.status(400).json({ error: 'email is not valid' });
    res.send();
  }

  // Deleting confirmation password field
  delete req.body.confirmedPassword;
  delete req.body.admin;

  return usersServices
    .findOne(mail)
    .then((userFound) => {
      if (userFound === null) {
        return usersServices
          .createOne(req.body)
          .then(createdUser => createdUser)
          .catch(err => err);
      }
    })
    .catch(err => err);
};
