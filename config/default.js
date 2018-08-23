module.exports = {
  port: process.env.PORT || 3000,
  database: {
    name: 'spotifav',
    url: process.env.DB,
  },
};
