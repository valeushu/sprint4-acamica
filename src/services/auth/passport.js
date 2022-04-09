import passport from 'passport';
import User from '../../models/user.js';

import { LocalLoginStrategy, LocalSignupStrategy } from './strategies/local.js';
import { GoogleStrategy } from './strategies/google.js';
import { DiscordStrategy } from './strategies/discord.js';
import { FacebookStrategy } from './strategies/facebook.js';

passport.use('local-login', LocalLoginStrategy);
passport.use('local-signup', LocalSignupStrategy);
passport.use('google', GoogleStrategy);
passport.use('discord', DiscordStrategy);
passport.use('facebook', FacebookStrategy);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

export default passport;
