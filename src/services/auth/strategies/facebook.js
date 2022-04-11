import { Strategy } from 'passport-facebook';
import User from '../../../models/user.js';


export const FacebookStrategy = new Strategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL:'http://localhost:7000/api/auth/facebook/callback',
        profileFields : ['emails'],
        //passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile.provider)
        console.log(profile.emails[0].value)
        //check if user alredy exists in db
        User.findOne({ "facebook.id": profile.id }).then((currentUser) => {
            if (currentUser) {
                // alredy have the user
                console.log('user is: ', currentUser);
                console.log(profile);
                return done(null, currentUser);
            }
            //if not, create user in our db
            new User({
                "facebook.email": profile.emails[0].value,
                "facebook.id": profile.id,
                //password: '',
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
