export const checkAuth = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    } catch (error) {
        console.log(error);
        return res.status(401).json({ status: 'unauthorized' });
    }
};
