import bcrypt from 'bcrypt';
import passport from 'passport';
import { Router } from 'express';
import signup from './users/middleware/signup';
import login, { isLogged } from './users/middleware/login';
import userServices from '../../modules/users/services';
import profil from './users/middleware/profil';
import { passwordUpdate } from './users/middleware/profil';
import jwtUtils from '../utils/jwt.utils';
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

router.get('/albums', (request, response) => {
  response.render(app.locals.views.gallerie);
});

router.get('/signup', (request, response) => {
  if (request.isAuthenticated()) {
    response.redirect(app.locals.home);
    done(null, false);
  }
  response.render(app.locals.views.signup, { title: 'S\'inscrire' });
});

router.post('/signup', (request, response, next) => {
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


export default router;
