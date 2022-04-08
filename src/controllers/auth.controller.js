import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

/** 
export const signup = async (req, res) => {
    console.log(req.body)
    res.send("recibido")
    try {
        const { email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hash,
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
            expiresIn: 86400, //24 hs
        });
        res.status(200).json({ savedUser, token });
    } catch (err) {
        console.log(err);
        res.render('something brokes');
    }
};**/

export const login = async (req, res) => {
    const userFound = await User.findOne({ email: req.body.email }).populate('roles');
    if (!userFound) return res.status(400).json({ message: 'user not found' });

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
    if (!matchPassword) return res.status(401).json({ token: null, message: 'invalid password' });
    const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
        expiresIn: 86400,
    });
    res.status(200).json({ status: 'login', token });
    req.token = token;
    console.log(token);
};

export const me = (req, res, next) => {
    res.status(200).json({ status: 'me', data: req.dataUser });
};

export const googleAuth = (req, res) => {
    passport.authenticate('google', { scope: ['profile'] });
};

export const googleCB = (req, res) => {
    passport.authenticate('google'),
        (req, res) => {
            res.send('callback function');
        };
};
