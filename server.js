const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const config = require('./config.js')
const massive = require('massive')
const cors = require('cors')
const AWS = require('aws-sdk')
const fs = require('fs')

let userRepository
let imageRepository
let databaseSetupRepository
massive(config.connectionString).then(dbInstance => {
  userRepository = require('./api/users/userRepository')(dbInstance)
  imageRepository = require('./api/images/imageRepository')(dbInstance)
  databaseSetupRepository = require('./databaseSetupRepository')(dbInstance)
  databaseSetupRepository.setSchema().then(() => console.log("Tables reset"))
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

passport.use(new Auth0Strategy({
    domain: config.auth0.domain,
    clientID: config.auth0.clientID,
    clientSecret: config.auth0.clientSecret,
    callbackURL: config.auth0.callbackURL
  },

  function (accessToken, refreshToken, extraParams, profile, done) {
    //put db calls here
    let user
    userRepository.get(profile.identities[0].user_id)
      .then((user) => {
        if (user) {
          console.log('User found. Logging in.')
          done(null, user)
        }

        else {
          console.log(profile)
          let name = profile.displayName.split(' ')
          let firstName = name[0]
          let lastName = name.slice(1).join(' ')
          userRepository.create(profile.identities[0].user_id, firstName, lastName)
            .then((user) => {
              console.log('User added: ', user)
              console.log('Logging in with user')
              done(null, user)
            })
            .catch((err) => console.log('Error adding user', err))

          //want to add more info to the user?  If it should be added the first time they log in, do it here
          //or change the redirect url to get info from the user
        }
      })
      .catch((err) => console.log('Error while checking user', err))
  }));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.sessionSecret
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log('serializing', user);
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  console.log('deserializing', user)
  done(null, user)
})

// My endpoints

app.post('/api/images', function (req, res) {
  AWS.config.loadFromPath('./aws-config.json');
  const s3 = new AWS.S3()
  const s3Params = {
    Bucket: 'pigeon-postcard',
    Key: 'myimage.jpg',
    ContentType: req.get('Content-type'),
    ContentLength: req.get('Content-length'),
    Body: req
  }
  s3.upload(
    s3Params,
    {patSize: 5 * 1024 * 1024, queueSize: 1},
    (err, response) => {
      console.log(err, response)
    }
  )
  //send back s3 url
  res.status(200).send()
})


app.post('/api/images/crop-info', function (req, res) {
  console.log('crop-info:', req.body)
  res.status(200).send()
})

app.get('/users', function (req, res, next) {

  userRepository.getAll()
    .then((response) => {
      console.log('First user first name: ', response[0].firstname)
    })
    .catch((err) => console.log('Error while checking user', err))
})

app.get('/auth', passport.authenticate('auth0'))

app.get('/auth/callback', passport.authenticate('auth0',
  {successRedirect: 'http://localhost:3000/'}))

app.get('/auth/me', function (req, res) {
  if (!req.user)
    return res.status(200).send({firstname: 'nobody'});
  res.status(200).send(req.user);
})

app.get('/auth/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`)
})