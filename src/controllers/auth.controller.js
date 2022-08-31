import passport from 'passport';

export const getSignupView = (req, res) => {
    res.render('signup');
};

export const getLoginView = (req, res) => {
    res.render('login');
};

export const signup = passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/api/auth/signup',
    passReqToCallback: true,
});

export const login = passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/api/auth/login',
    passReqToCallback: true,
});

export const logout = (req, res) => {
    req.logout();
    res.redirect('/api/auth/login');
};

export const googleLogin = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = passport.authenticate('google', {
    successRedirect: '/profile',
});

export const facebookLogin = passport.authenticate('facebook', { scope: ['public_profile', 'email'] });

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
