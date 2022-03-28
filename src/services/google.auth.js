import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
//import User from "../models/user.js";

const GOOGLE_CLIENT_ID = "650294144545-1bf2et7ro0u8p0nudi68arkh1baevk84.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7000/api/auth/google/callback",
    //passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });