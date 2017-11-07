module.exports = function (app) {
  require('./auth')(app);
  require('./graphql')(app);
}