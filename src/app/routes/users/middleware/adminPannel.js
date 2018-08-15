import IdValidator from 'valid-objectid';
import userServices from '../../../../modules/users/services';
import app from '../../../../app';
import signUp from './signup';

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default function (request, response) {
  const email = request.user.email;

  return userServices
    .findExceptCurrent(email)
    .then((getUsers) => {
      response.locals.users = getUsers;
      response.render('adminPannel');
    })
    .catch(err => err);
}

export const deleteUserById = function (request, response) {
  const adminPannelLink = '/admin/pannel/';
  if (id !== '') {
    userServices
      .findOneById(id)
      .then((userFound) => {
        if (userFound !== null) {
          return userServices
            .deleteOne(userFound.email)
            .then((res) => {
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
export const userExist = function (request, response, next) {
  const id = request.query.id;
  const adminPannelLink = '/admin/pannel/';

  if (id === '' || !IdValidator.isValid(id)) {
    response.redirect(adminPannelLink);
    done(null, false);
  } else {
    console.log(`id : ${id}`);
    return userServices
      .findOneById(id)
      .then((userFound) => {
        console.log('User found ');
        console.log(userFound);
        if (userFound === null) {
          response.redirect(adminPannelLink);
          done(null, false);
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

  return userServices
    .findOneById(id)
    .then((userFound) => {
      if (userFound === null) {
        response.redirect(adminPannelLink);
        // done(null, false);
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

  return userServices
    .findOneById(id)
    .then((userFound) => {
      if (userFound === null) {
        done(null, false);
      }
      const mail = userFound.email;

      request.body.email = mail;
      userServices
        .updateOne(mail, request.body)
        .then((res) => {
          response.render('profilUpdate', { errorMessage: true, message: 'utilisateur mis à jour !' });
        })
        .catch(err => err);
    })
    .catch(err => err);
};

export const addUser = function (req, res) {
  console.log(req.body);

  // Params
  const mail = req.body.email;
  const pwd = req.body.password;
  const confirmedPwd = req.body.confirmedPassword;
  const adminUser = req.body.admin;

  if (adminUser === 'on'){
    req.body.isAdmin = true;
    delete req.body.admin;
  }

  if (mail == null || pwd == null || confirmedPwd == null) {
    return res.status(400).json({ error: 'missing parameters' });
  }

  if (pwd !== confirmedPwd) {
    return res.status(400).json({ error: 'different password' });
  }

  // Deleting confirmation password field
  delete req.body.confirmedPassword;

  if (!EMAIL_REGEX.test(mail)) {
    return res.status(400).json({ error: 'email is not valid' });
  }

  console.log(req.body);
  return userServices
    .findOne(mail)
    .then((userFound) => {
      if (userFound == null) {
        return userServices
          .createOne(req.body)
          .then(createdUser => createdUser);
      }
    })
    .catch((err) => {});
};
