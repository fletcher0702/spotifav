module.exports = {
  port: process.env.PORT || 5000,
  database: {
    name: 'spotifav',
    url: process.env.DB,
  },
};
