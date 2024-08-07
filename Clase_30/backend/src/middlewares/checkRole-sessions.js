//Para usar con Sessions
export const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).json({ msg: 'Forbidden: Admins only' });
    }
};

export const isUser = (req, res, next) => {
    if(req.isAuthenticated() && req.user.role === 'user') {
        return next();
    } else {
        return res.status(403).json({ msg: 'Forbidden: Users only' });
    }
};