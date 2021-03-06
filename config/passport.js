const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const UserModel = require('../models/user.model');
const keys = require("./keys");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      UserModel.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

  passport.use(new GoogleStrategy({
    clientID: '231863644828-864d66hfo2feceoj9l55fk9v084jfhcg.apps.googleusercontent.com',
    clientSecret: 's9xodxS7LdiFBKY8fPvPwm_-',
    callbackURL: "http://localhost:2000/user/google/callback",
    passReqToCallback: true
  },
    function (request, accessToken, refreshToken, profile, done) {

      UserModel.findOne({ googleID: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            done(null, existingUser)
          } else {
            new UserModel({
              googleID: profile.id,
              name: profile.displayName,
            }).save()
              .then((user) => {
                done(null, user)
              })
          }
        })
    }
  ));

  passport.use(new FacebookStrategy({
    clientID: "1052923758435168",
    clientSecret: "11268e7b98c5a9582008d05b84a51dfe",
    callbackURL: "http://localhost:2000/user/facebook/callback"
  },
    function (accessToken, refreshToken, profile, done) {
      UserModel.findOne({ googleID: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            done(null, existingUser)
          } else {
            new UserModel({
              googleID: profile.id,
              name: profile.displayName,
            }).save()
              .then((user) => {
                done(null, user)
              })
          }
        })
    }
  ));
};