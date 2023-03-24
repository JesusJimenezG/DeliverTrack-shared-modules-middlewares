"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encrypt_handler_1 = require("../utils/encrypt.handler");
const jwt_handler_1 = require("../utils/jwt.handler");
const validateToken = (req, res, next, jwt_secret) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(401)
            .json({ message: 'Authorization header is missing' });
    }
    // Verify the token and extract the user context
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = (0, jwt_handler_1.verifyToken)(token, jwt_secret);
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const fingerprint = decodedToken.fingerprint;
    // Get the cookie and compare it with the hashed user context
    const session_fingerprint = req.cookies.fingerprint;
    const hash = (0, encrypt_handler_1.hashString)(session_fingerprint);
    if (hash !== fingerprint) {
        return res.status(401).json({ message: 'Invalid session_fingerprint' });
    }
    return next();
};
exports.default = validateToken;
