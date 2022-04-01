import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import User from '../models/user.js';

const GOOGLE_CLIENT_ID = '650294144545-1bf2et7ro0u8p0nudi68arkh1baevk84.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:7000/api/auth/google/callback',
            //passReqToCallback   : true
        },
        function (accessToken, refreshToken, profile, done) {
            //check if user alredy exists in db
            User.findOne({ googleId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    // alredy have the user
                    console.log('user is: ', currentUser);
                    return done(null, profile);
                } else {
                    //if not, create user in our db
                    new User({
                        username: profile.displayName,
                        googleId: profile.id,
                        email: profile.emails[0].value,
                    })
                        .save()
                        .then((newUser) => {
                            console.log('new user created: ' + newUser);
                        });
                }
            });
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
