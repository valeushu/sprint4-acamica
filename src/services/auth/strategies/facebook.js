import { Strategy } from 'passport-facebook';
import User from '../../../models/user.js';

export const FacebookStrategy = new Strategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: 'http://localhost:7000/api/auth/facebook/callback',
    },
    function (accessToken, refreshToken, profile, done) {
        //check if user alredy exists in db
        User.findOne({ 'facebook.id': profile.id }).then((currentUser) => {
            if (currentUser) {
                // alredy have the user
                console.log('user is: ', currentUser);
                console.log(profile);
                return done(null, currentUser);
            }
            //if not, create user in our db
            new User({
                'facebook.username': profile.displayName,
                'facebook.id': profile.id,
                //"facebook.email": profile.emails[0].value,
            })
                .save()
                .then((newUser) => {
                    console.log('new user created: ' + newUser);
                    done(null, newUser);
                });
        });
    }
);
