import bcrypt from 'bcrypt';
import passport from 'passport';
import { Router } from 'express';
import signup from './users/middleware/signup';
import login from './users/middleware/login';
import userServices from '../../modules/users/services';
import profil from './users/middleware/profil';
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

passport.serializeUser((user, done) => {
  console.log(`serializing id: ${user._id}`);
  console.log(`serializing email : ${user.email}`);
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializing method');
  userServices
    .findOneById(id)
    .then((user) => {
      if (user === null) {
        console.log('Error while deserializing user...');
        return done(null, false);
      }

      console.log(`deserializeUser id : ${user._id}`);
      console.log(`deserializeUser email: ${user.email}`);
      return done(null, user);
    });
});

router.get('/', (request, response) => {
  response.redirect('/home');
});

router.get('/home', (request, response) => {
  console.log(`Authenticated : ${request.isAuthenticated()}`);

  response.render(app.locals.views.home, { title: 'Acceuil' });
});

router.get('/login', (request, response) => {
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

// router.post('/login', (request, response) => {
//   login(request, response)
//     .then((userFound) => {
//       if (userFound !== null) {
//         if (bcrypt.compareSync(request.body.password, userFound.password)) {
//           const jwtToken = jwtUtils.generateTokenForUser(userFound);
//           console.log(`Generated Token after login : ${jwtToken}`);
//           request.login(jwtToken, (err) => {
//             console.log(`Error while serializing data !${err}`);
//           });
//           response.redirect(app.locals.home);
//         } else {
//           console.log('Can\'t login');
//           response.render(views.login, { title: 'Se connecter', errorMessage: true, message: 'Email ou mot de passe incorrect.' });
//         }
//       } else {
//         console.log('Can\'t login');
//         response.render(views.login, { title: 'Se connecter', errorMessage: true, message: 'Email ou mot de passe incorrect.' });
//       }
//     });
// });

router.get('/albums', (request, response) => {
  response.render(app.locals.views.gallerie);
});

router.get('/signup', (request, response) => {
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

router.get('/logout', (request, response) => {
  request.logout();
  request.session.destroy();
  response.redirect(app.locals.home);
});

router.get('/profil', (request, response, next) => {
  isLogged(request, response, next);
}, (request, response) => {
  response.render(app.locals.views.profil, { message: `Welcome ${request.user.email}` });
});


export default router;

function isLogged(request, response, next) {
  if (request.isAuthenticated()) next();
  else response.redirect(app.locals.home);
}
