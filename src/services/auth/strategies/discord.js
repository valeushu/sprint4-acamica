import { Strategy } from 'passport-discord';
import User from '../../../models/user.js';

export const DiscordStrategy = new Strategy(
    {
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: 'http://localhost:7000/api/auth/discord/callback',
        scope: ['identify', 'email'],
    },
    function (accessToken, refreshToken, profile, done) {
        console.log( profile.email)
        //check if user alredy exists in db
        User.findOne({ "discord.id": profile.id }).then((currentUser) => {
            if (currentUser) {
                // alredy have the user
                console.log('user is: ', currentUser);
                console.log(profile);
                return done(null, currentUser);
            }
            //if not, create user in our db
            new User({
                "discord.id": profile.id,
               "discord.email": profile.email,
                //password: '',
            })
                .save()
                .then((newUser) => {
                    console.log('new user created: ' + newUser);
                    done(null, newUser);
                });
        });
    }
);
