import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
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
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: 'http://localhost:7000/api/auth/discord/callback',
            scope   : ['identify', 'email'],
        },
        function (accessToken, refreshToken, profile, done) {
            //check if user alredy exists in db
            User.findOne({ "discord.id" : profile.id }).then((currentUser) => {
                if (currentUser) {
                    // alredy have the user
                    console.log('user is: ', currentUser);
                    console.log(profile)
                    return done(null, currentUser);
                }
                //if not, create user in our db
                new User({
                    "discord.username" : profile.displayName,
                    "discord.id": profile.id,
                    "discord.email": profile.email
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
