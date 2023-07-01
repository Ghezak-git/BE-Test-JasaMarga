import jwt from 'jsonwebtoken';

export const generateToken = (payload, secret, expired) => {
    const token = jwt.sign(payload, secret, { expiresIn: expired });
    return token;
}

export const verifyToken = (token, secret) => {
    const payload = jwt.verify(token, secret);
    return payload;
}