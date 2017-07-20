const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const config = require('./config.js')
const massive = require('massive')
const cors = require('cors')
const connectionString = 'postgres://yffjwsuvablimm:20dc0312377b43a5967876c82e90096073ca8402751cffe9194c2c424197bf31@ec2-107-22-251-55.compute-1.amazonaws.com:5432/d46jkoh0p1op5q?ssl=true'


app.use(bodyParser.json())

massive(connectionString).then( dbInstance => {
  app.set('db', dbInstance)

  dbInstance.set_schema()
    .then( () => console.log('Tables successfully reset'))
    .catch( (err) => console.log('Try again', err));

  passport.use(new Auth0Strategy({
      domain: config.auth0.domain,
      clientID: config.auth0.clientID,
      clientSecret: config.auth0.clientSecret,
      callbackURL: config.auth0.callbackURL
    },

    function(accessToken, refreshToken, extraParams, profile, done) {
      //put db calls here


      done(null, profile)
    }));

});

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.sessionSecret
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('serializing', user);
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  console.log('deserializing', user)
  done(null, user)
})

// My endpoints



app.get('/auth', passport.authenticate('auth0'))

app.get('/auth/callback', passport.authenticate('auth0',
  {successRedirect: 'http://localhost:3000/'}))

app.get('/auth/me', function(req, res) {
  if (!req.user) return res.status(200).send({name: 'nobody'});
  res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

app.listen(config.port, () => {console.log(`Listening on port ${config.port}...`)})