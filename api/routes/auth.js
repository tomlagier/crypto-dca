const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const Store = require('connect-session-sequelize')(expressSession.Store);
const flash = require('express-flash');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
  const db = require('../helpers/db').up();

  passport.use('local', new LocalStrategy(
    async function (username, password, done) {
      const { validLogin, user } = await db.User.checkPassword(username, password)
      return validLogin ?
        done(null, user) :
        done(null, false, {
          message: 'Invalid username or password'
        });
    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(async function(id, done) {
    const user = await db.User.findById(id);
    done(null, user);
  });

  app.use(expressSession({
    secret: 'CHANGEME!',
    store: new Store({
      db: db.sequelize
    }),
    resave: false,
    saveUninitialized: false
  }))

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.post(
    '/login',
    bodyParser.urlencoded({ extended: true }),
    passport.authenticate('local', {
      failureFlash: true
    }),
    (req, res) => res.send(req.user.id)
  );

  app.post(
    '/logout',
    (req, res) => {
      req.logout();
      res.send();
    }
  )
}