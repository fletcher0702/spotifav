import session from 'express-session';
import config from 'config';

const MongoStore = require('connect-mongo')(session);


export default {
  secret: 'knbzxcnzisnoINUBYstvdkozdas',
  resave: false,
  store: new MongoStore({ url: config.get('database').url }),
  saveUninitialized: false,
  cookie: { secure: true },
};
