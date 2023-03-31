"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOMiddleware = void 0;
const cookie_1 = __importDefault(require("cookie"));
const jwt_handler_1 = require("../utils/jwt.handler");
const encrypt_handler_1 = require("../utils/encrypt.handler");
// const  = process.env.JWT_SECRET || 'secret';
const IOMiddleware = (io, jwt_secret) => io.use((socket, next) => {
    // Get the token from the Authorization header
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Token is missing'));
    }
    // Verify the token and extract the user context
    let decodedToken;
    try {
        decodedToken = (0, jwt_handler_1.verifyToken)(token, jwt_secret);
    }
    catch (err) {
        return next(new Error('Invalid token'));
    }
    const fingerprint = decodedToken.fingerprint;
    // Get the cookie and compare it with the hashed user context
    const cookies = socket.handshake.headers.cookie;
    const parsedCookies = cookie_1.default.parse(cookies);
    const session_fingerprint = parsedCookies.fingerprint;
    const hash = (0, encrypt_handler_1.hashString)(session_fingerprint);
    if (hash !== fingerprint) {
        return next(new Error('Invalid session_fingerprint'));
    }
    return next();
});
exports.IOMiddleware = IOMiddleware;
