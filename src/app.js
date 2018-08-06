import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import hbs from 'express-handlebars';
import path from 'path';
import router from './routes';
// import apiRouter from './api';

const app = express();

// Setting default location of layout template
app.engine('hbs', hbs({
  extname: 'hbs', defaultLayout: 'layout', layoutsDir: path.join(__dirname, '../views/layouts/'), partialsDir: path.join(__dirname, '../views/partials/'),
}));

// set the view engine to ejs
app.set('views', path.join(__dirname, '../views/pages/'));
app.set('view engine', '.hbs');

// retrieving datas
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// loading css et js from semantic
app.use(express.static('public'));

app.use('', router);
// app.use('/api', apiRouter);

app.listen(config.get('port'), () => {
  console.log('You Now Listening on port 3000');
});
export default app;
