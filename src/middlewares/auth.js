import jwt from 'jsonwebtoken';

export const checkAuth = async (req, res, next) => {
    try {
        console.log("CHECK AUTH MIDDLEWARE")
        if (req.isAuthenticated()) {
            return next();
        }
        console.log("NO ESTA AUTENTICADO POR PASSPORT");

        let token = req.header('Authorization');
        if (!token) {
            return res.status(403).json({ status: 'no token provided' })
        };
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });

        req.dataUser = user;
        if (!user) {
            return res.status(404).json({ status: 'no user found' });
        }

        req.token = token;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ status: 'unauthorized' });
    }
};



