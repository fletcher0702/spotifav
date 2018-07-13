import { MongoClient } from 'mongodb';
import config from 'config';

const {
  url,
  name,
} = config.get('database');

export default function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) return reject(err);

      return resolve(client.db(name));
    });
  });
}
