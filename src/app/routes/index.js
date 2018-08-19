import passport from 'passport';
import { Router } from 'express';
import signup from './users/middleware/signup';
import login, { isLogged } from './users/middleware/login';
import userServices from '../../modules/users/services';
import profil, { passwordUpdate } from './users/middleware/profil';
import admin, {
  deleteUserById, userExist, editUser, updateUserIdentity, addUser,
} from './users/middleware/adminPannel';
import isAdmin from './users/middleware/isAdmin';
import searchAlbum from './favoris/middleware/searchAlbum';
import findFavorites from './favoris/middleware/findFavorites';
import deleteFavorite from './favoris/middleware/deleteFavorite';
import addFavorite from './favoris/middleware/addFavorite';
import deleteUserFavorite from './favoris/middleware/deleteUserFavorite';
import app from '../../app';

const router = Router();
const LocalStrategy = require('passport-local').Strategy;

// passport Auth strategy

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, login);

passport.use(localStrategy);

// Help for retrieving data with session informations
passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  userServices
    .findOneById(id)
    .then((user) => {
      if (user === null) {
        return done(null, false);
      }
      return done(null, user);
    });
});

// Routes
router.get('/', (request, response) => {
  response.redirect('/home');
});

router.get('/home', (request, response) => {
  response.render(app.locals.views.home, { title: 'Acceuil' });
});

router.get('/login', (request, response) => {
  if (request.isAuthenticated()) {
    response.redirect(app.locals.home);
    done(null, false);
  }
  response.render(app.locals.views.login, { title: 'Se connecter' });
});

router.post('/login', (request, response, next) => {
  if (request.isAuthenticated()) {
    response.redirect(app.locals.home);
    done(null, false);
  }
  const mail = request.body.username;
  const pwd = request.body.password;

  if (mail === null || pwd === null || mail === '' || pwd === '') {
    response.render(app.locals.views.login, { errorMessage: true, message: 'Champ(s) vide(s) !' });
  } else next();
},
passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
}));

router.get('/albums', searchAlbum);

router.get('/signup', (request, response) => {
  if (request.isAuthenticated()) {
    response.redirect(app.locals.home);
    done(null, false);
  }
  response.render(app.locals.views.signup, { title: 'S\'inscrire' });
});

router.post('/signup', (request, response, next) => {
  if (request.isAuthenticated()) {
    response.redirect(app.locals.home);
    done(null, false);
  }
  signup(request, response, next)
    .then((userFound) => {
      if (userFound) {
        response.render(app.locals.views.login, { errorMessage: false, message: 'Vous être bien inscrit, connectez vous !' });
      } else response.render(app.locals.views.signup, { errorMessage: true, message: 'Email dejà pris, désolé :-(' });
    });
});

router.get('/logout', isLogged, (request, response) => {
  request.logout();
  request.session.destroy();
  response.redirect(app.locals.home);
});

router.get('/profil', isLogged, (request, response) => {
  const lastNameUser = request.user.lastName;
  const firstNameUser = request.user.firstName;

  response.render(app.locals.views.profil, { lastName: lastNameUser, firstName: firstNameUser });
});

router.post('/profil', isLogged, profil);

router.post('/profil/password/update/', isLogged, passwordUpdate);

router.get('/admin/pannel/', isAdmin, admin);

router.get('/admin/pannel/create', isLogged, isAdmin, (request, response) => {
  response.render(app.locals.views.createUser);
});
router.post('/admin/pannel/create', isLogged, isAdmin, (request, response) => {
  addUser(request, response)
    .then((userFound) => {
      if (userFound !== null) {
        response.render(app.locals.views.createUser, { createdUserMessage: true, message: 'Utilisateur créé !' });
      } else {
        response.render(app.locals.views.createUser, { createdUserError: true, message: 'Désolé le mail existe déjà :-(  ' });
      }
    }).catch(err => err);
});
router.get('/admin/pannel/update', isLogged, isAdmin, userExist, editUser);
router.post('/admin/pannel/update', isLogged, isAdmin, updateUserIdentity);

router.get('/admin/pannel/delete', isLogged, isAdmin, deleteUserById);

// spotify routes

router.get('/favorites', isLogged, findFavorites);
router.get('/favorites/rating/:albumId/:albumName', isLogged, addFavorite);
router.get('/admin/favorites/delete/:userId/:albumId', isLogged, isAdmin, deleteUserFavorite);
router.get('/favorites/delete', isLogged, deleteFavorite);

export default router;
