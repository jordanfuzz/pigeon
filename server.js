const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const config = require('./config.js')

app.use(bodyParser.json())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.sessionSecret
}))

app.use(passport.initialize());
app.use(passport.session());



// passport.use(new Auth0Strategy({
//   domain: ,
//   clientID: ,
//   clientSecret: ,
//   callbackURL: ,
// },
// function(accessToken, refreshToken, extraParams, profile, done) {
//  put db calls here
//
//
// done(null, user)
// )

//passport.serializeUser(function(user, done) {
// console.log('serializing', user);
// done(null, user)
//

//passport.deserializeUser(function(user, done) {
// console.log('deserialize')
// done(null, user)
//

//app.get('/auth', passport.authenticate('auth0'))

//app.get('/auth/callback', passport.authenticate('auth0', {successRedirect: 'http://localhost:3000'}))

//check if someone's logged on

//logout endpoint

app.listen(config.port, () => {console.log(`Listening on port ${config.port}...`)})