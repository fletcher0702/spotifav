// import express from 'express';
import { Router } from 'express';
import createOne from './users/middleware/createOne';

const router = Router();

const views = {

  home: 'index',
  subscribe: 'subscribe',
  login: 'login',
  gallerie: 'albums',
};


router.get('/', (request, response) => {
  response.redirect('/home');
});
router.get('/users', (request, response) => {
  response.send('User');
});
router.post('/users', createOne);

router.get('/home', (request, response) => {
  response.render(views.home, { title: 'Acceuil', albums: '/albums' });
});

router.post('/home', (request, response) => {
  response.render(views.home);
});

router.get('/login', (request, response) => {
  console.log(request.body);

  response.render(views.login, { home: '/home', title: 'Acceuil' });
});

router.post('/', (request, response) => {
  console.log(request.body);
  response.render(views.login);
});
router.get('/subscribe', (request, response) => {
  response.render(views.subscribe, { home: '/home', title: 'S\'inscrire' });
});

router.get('/albums', (request, response) => {
  response.render(views.gallerie);
});


export default router;
