import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import User from '../models/user.js';
import 'dotenv/config';

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:7000/api/auth/google/callback',
            //passReqToCallback   : true
        },
        function (accessToken, refreshToken, profile, done) {
            //check if user alredy exists in db
            User.findOne({ "google.id" : profile.id }).then((currentUser) => {
                if (currentUser) {
                    // alredy have the user
                    console.log('user is: ', currentUser);
                    console.log(profile)
                    return done(null, currentUser);
                }
                //if not, create user in our db
                new User({
                    "google.username" : profile.displayName,
                    "google.id": profile.id,
                    "google.email": profile.emails[0].value,
                })
                    .save()
                    .then((newUser) => {
                        console.log('new user created: ' + newUser);
                        done(null, newUser);
                    });
            });
        }
    )
);
