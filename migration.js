const config = require('config');
const { MongoClient } = require('mongodb');

const {
  url,
  name,
} = config.get('database');

MongoClient.connect(url, (err, client) => {
  if (err) throw err;

  client.db(name).collection('lists').createIndex({ name: 'text', description: 'text' }, { default_language: 'none' })
    .then(() => client.db(name).collection('tasks').createIndex({ name: 'text', description: 'text' }, { default_language: 'none' }))
    .then(() => client.db(name).collection('users').createIndex({
      firstName: 'text', lastName: 'text', email: 'text', password: 'text',
    }, { default_language: 'none' }))
    .then(() => client.close())
    .catch((error) => {
      client.close();

      console.error(error); // eslint-disable-line no-console
    });
});
