import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import hbs from 'express-handlebars';
import path from 'path';
import passport from 'passport';
import appRouter from './app/routes';
import apiRouter from './api';
import notFoundMiddleware from './middleware/notFound';
import errorsMiddleware from './middleware/errors';

const app = express();

// global variables for links, will be used by the layout
app.locals.home = '/home';
app.locals.login = false;
app.locals.loginAction = '/login';
app.locals.albums = '/albums';
app.locals.profil = '/profil';
app.locals.logout = '/logout';
app.locals.signup = '/signup';

// Setting default location of layout template
app.engine('hbs', hbs({
  extname: 'hbs', defaultLayout: 'layout', layoutsDir: path.join(__dirname, '../views/layouts/'), partialsDir: path.join(__dirname, '../views/partials/'),
}));

// set the view engine to hbs
app.set('views', path.join(__dirname, '../views/pages/'));
app.set('view engine', '.hbs');

// retrieving datas
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// loading css et js from semantic
app.use(express.static('public'));

app.use(passport.initialize());

app.use('', appRouter);
app.use('/api', apiRouter);

app.use(
  notFoundMiddleware,
  errorsMiddleware,
);

app.listen(config.get('port'), () => {
  console.log('You now listening on port 3000');
});
export default app;
