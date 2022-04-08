import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    'local-signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            //callbackURL: 'http://localhost:7000/api/auth/google/callback',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            const hash = await bcrypt.hash(password, 10);
            //check if user alredy exists in db
            User.findOne({ email: email }).then((currentUser) => {
                if (currentUser) {
                    // alredy have the user
                    console.log('user is: ', currentUser);
                    console.log(email);
                    return done(null, false, req.flash('signupMessage', 'the email alredy exist'));
                }
                //if not, create user in our db
                new User({
                    email,
                    password: hash,
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

passport.use(
    'local-login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            //callbackURL: 'http://localhost:7000/api/auth/google/callback',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            const userFound = await User.findOne({ email: email });
            if (!userFound) {
                return done(null, false, req.flash('loginMessage', 'user not found'));
            }
            const matchPassword = await User.comparePassword(password, userFound.password);
           
            if (!matchPassword) {
                return done(null, false, req.flash('loginMessage', 'incorrect password'));
            }
            const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
                expiresIn: 86400,
            });
            req.token = token;
            console.log(token);
            done(null, userFound)
            /** 
            const user = await User.findOne({ email : email });
            const userPass = await User.findOne({ email : email }).then((currentUser)=>{
                    return currentUser.password
            })
            console.log(userPass)
            const match = await User.comparePassword(password, userPass);
            console.log(match)
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'no user found'));
                }
                if(!match){
                    return done (null, false, req.flash('loginMessage', 'incorrect password'))
                }
                done(null, user)
                **/
        }
    )
);
