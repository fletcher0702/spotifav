// import express from 'express';
import { Router } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import createOne from './middleware/createOne';
import listsServices from '../../modules/users/services';


const router = Router();

router.use(passport.initialize());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
(username, password, done) => {
  listsServices
    .findUser(username, password)
    .then(user => done(null, user))
    .catch(err => done(err));
}));

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  listsServices
    .findOne(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

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

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.get('/login', (request, response) => {
  response.render(views.login, { home: '/login', title: 'Acceuil' });
});

router.post('/', (request, response) => {
  response.render(views.login);
});
router.get('/subscribe', (request, response) => {
  response.render(views.subscribe, { home: '/home', title: 'S\'inscrire' });
});

router.get('/albums', (request, response) => {
  response.render(views.gallerie);
});


export default router;
