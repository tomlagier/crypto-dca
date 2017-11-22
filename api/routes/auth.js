const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const Store = require('connect-session-sequelize')(expressSession.Store);
const flash = require('express-flash');
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const logger = require('../helpers/logger');
const {
  SESSION_KEY,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET
} = process.env;

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

  passport.use('github', new GithubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8088/auth/github/callback',
    },
    async (accessToken, refreshToken, { _json: { login } }, done) => {
      const [user] = await db.User.findOrCreate({
        where: {
          name: login
        }
      })
      return done(null, user);
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
    secret: SESSION_KEY,
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
    '/auth/local',
    bodyParser.urlencoded({ extended: true }),
    passport.authenticate('local'),
    (req, res) => res.send(req.user.id)
  );

  app.get(
    '/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
  );

  app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: 'http://localhost:8087'
    }),
  );

  app.post(
    '/logout',
    async (req, res) => {
      req.logout();
      req.session.destroy(function (err) {
        err && logger.error(err);
        res.clearCookie('connect.sid');
        res.sendStatus(200);
      })
    }
  )
}