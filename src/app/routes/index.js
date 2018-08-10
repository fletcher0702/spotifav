import { Router } from 'express';
import signup from './users/middleware/signup';
import login from './users/middleware/login';
import jwtUtils from '../utils/jwt.utils'
import app from "../../app";
import bcrypt from "bcrypt";

const router = Router();

const views = {

  home: 'index',
  signup: 'signup',
  logout: 'logout',
  login: 'login',
  gallerie: 'albums',
  profil: 'profil',
};


router.get('/', (request, response) => {
  response.redirect('/home');
});

router.get('/home', (request, response) => {
  response.render(views.home, { title: 'Acceuil', album: '/albums' });
});

router.get('/login', (request, response) => {
  response.render(views.login, { loginAction: '/login', title: 'Se connecter'});
});

router.post('/login', (request, response) => {
  login(request, response)
    .then((userFound) => {
      if (userFound !== null) {

        if (bcrypt.compareSync(request.body.password, userFound.password)) {
          app.locals.login = true;
          app.locals.jwtToken = jwtUtils.generateTokenForUser(userFound);
          console.log(userFound);
          response.redirect(app.locals.home);
        }
      } else {
        console.log('Can\'t login');
        response.render(views.login, { title: 'Se connecter', errorMessage: true });
      }
    });
});

router.get('/albums', (request, response) => {
  response.render(views.gallerie);
});

router.get('/signup', (request, response) => {
  response.render(views.signup, { title: 'S\'inscrire' });
});

router.post('/signup', (request, response, next) => {
  signup(request, response, next)
    .then((userFound) => {
      if (userFound) {
        response.redirect('/login');
      } else console.log('User not found');
    });
});

router.get('/logout', (request, response) => {

  if (app.locals.login) {
    app.locals.login = false;
    console.log('Log out');
    response.redirect(app.locals.home);
  } else {
    console.log('User not logged');
    response.redirect(app.locals.home);
  }

});

export default router;
