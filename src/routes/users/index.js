// import express from 'express';
import { Router } from 'express';
import createOne from './middleware/createOne';

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

router.post('/login', (request, response) => {
  response.render(views.home);
  console.log(request.body);
});

router.get('/login', (request, response) => {
  console.log(request.body);
  response.render(views.login, { home: '/login', title: 'Acceuil' });
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
