
import * as UserRepository from "../repositories/UserRepository.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { validateRequest } from "../utils/validations.js";

export const Login = async(req, res) => {
    try {
        const validationConfig = [
            { field: "username", validation: (value, req) => { return true }, min: 4 },
            { field: "password", validation: (value, req) => { return true }, min: 6 },
        ]

        try {
            await validateRequest(req, validationConfig);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const { username, password } = req.body;
        
        const user = await UserRepository.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "Username or password is incorrect" });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Username or password is incorrect" });
        }

        const payload = {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
        }
        
        const acces_token = generateToken(payload, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRED);
        const refresh_token = generateToken(payload, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRED);
        
        await UserRepository.update({ refresh_token: refresh_token, last_logon: new Date() }, { id: user.id });
        res.cookie('refresh_token', refresh_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.cookie('access_token', acces_token, { httpOnly: true, maxAge: 1 * 60 * 60 * 1000 })

        res.status(200).json({ access_token: acces_token, refresh_token: refresh_token, data: payload });
    } catch (error) {
        res.status(500).json({ message: 'Server error please try again later' });
    }
}

export const Register = async(req, res) => {
    try {
        const validationConfig = [
            { field: "fullname", validation: (value, req) => { return true }, min: 4 },
            { field: "username", validation: (value, req) => { return true }, min: 4 },
            { field: "password", validation: (value, req) => { return true }, min: 6 },
        ];

        try {
            await validateRequest(req, validationConfig);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const { fullname, username, password } = req.body;
        
        const payload = {
            fullname: fullname,
            username: username,
            password: await hashPassword(password),
            created_by: "System",
            updated_by: "System",
        }

        await UserRepository.create(payload);

        res.status(200).json({ message: "User has been created" });
    } catch (error) {
        res.status(500).json({ message: 'Server error please try again later' });
    }
}

export const RefreshToken = async(req, res) => {
    try {
        let token;
        if (req.cookies.refresh_token) {
            token = req.cookies.refresh_token;
        } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            verifyToken(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await UserRepository.findOne({ refresh_token: token });
        if (!user) {
            return res.status(401).json({ message: "This token is not valid" });
        }

        const payload = {
            id: user.id,
            username: user.username,
            fullname: user.fullname,
        }

        const acces_token = generateToken(payload, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRED);
        const refresh_token = token;
        
        await UserRepository.update({ refresh_token: refresh_token }, { id: user.id });
        res.cookie('access_token', acces_token, { httpOnly: true, maxAge: 1 * 60 * 60 * 1000 })

        res.status(200).json({ access_token: acces_token, refresh_token: refresh_token, data: payload });
    } catch (error) {
        res.status(500).json({ message: 'Server error please try again later' });
    }
}