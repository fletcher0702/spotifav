import { Router } from 'express';
import signup from './users/middleware/signup';
import login from './users/middleware/login';

const router = Router();

const views = {

  home: 'index',
  signup: 'signup',
  login: 'login',
  gallerie: 'albums',
};


router.get('/', (request, response) => {
  response.redirect('/home');
});

router.get('/home', (request, response) => {
  response.render(views.home, { title: 'Acceuil', albums: '/albums' });
});

router.get('/login', (request, response) => {
  response.render(views.login, { login: '/login', title: 'Se connecter' });
});

router.post('/login', login);

router.get('/signup', (request, response) => {
  response.render(views.signup, { home: '/signup', title: 'S\'inscrire' });
});

router.post('/signup', (request, response, next) => {
  signup(request, response, next)
    .then((userFound) => {
      if (userFound) {
        response.redirect('/login');
      } else console.log('User not found');
    });
});

router.get('/albums', (request, response) => {
  response.render(views.gallerie);
});

export default router;
