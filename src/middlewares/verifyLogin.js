import User from '../models/user.js';

export const isLoginUser = async (req, res, next) => {
    const user = await User.findById(req.userId);
    console.log(req.userI);
    if (!user) {
        res.status(404).send({ result: 'user no login' });
    } else {
        req.user = user;
        next();
    }
};
