import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const LocalSignupStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        const hash = await bcrypt.hash(password, 10);
        //check if user alredy exists in db
        User.findOne({ "local.email": email }).then((currentUser) => {
            if (currentUser) {
                // alredy have the user
                return done(null, false, req.flash('signupMessage', 'the email alredy exist'));
            }
            //if not, create user in our db
            const newUserData = {
               "local.email": email,
                "local.password": hash,
            };
            new User(newUserData).save().then((newUser) => {
                console.log('new user created: ' + newUser);
                done(null, newUser);
            });
        });
    }
);

export const LocalLoginStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        const userFound = await User.findOne({ "local.email": email });
        if (!userFound) {
            return done(null, false, req.flash('loginMessage', 'user not found'));
        }
        const matchPassword = await User.comparePassword(password, userFound.local.password);
  
        if (!matchPassword) {
            return done(null, false, req.flash('loginMessage', 'incorrect password'));
        }
        
        const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
            expiresIn: 86400,
        });
        req.token = token;
        
        done(null, userFound);
    }
);
