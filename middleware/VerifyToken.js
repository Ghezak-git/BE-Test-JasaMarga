import { verifyToken } from "../utils/jwt.js";

export const VerifyToken = (req, res, next) => {
    try {
        let token;
        let payload;
        if (req.cookies.access_token) {
            token = req.cookies.access_token;
        } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        }
    
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            payload = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
        }catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = payload;

        next();
    } catch (error) {
        res.status(500).json({ message: 'Middleware error please try again later' });
    }
}