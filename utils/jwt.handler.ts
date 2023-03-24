import jwt from 'jsonwebtoken';
import { JwtPayload, Token } from '../interfaces/auth.interface';

const generateToken = (hash: string, jwt_secret: string): Token => {
    const token = jwt.sign({ fingerprint: hash }, jwt_secret);
    return { token };
};

const verifyToken = (token: string, jwt_secret: string): JwtPayload => {
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;
    return decoded;
};

export { generateToken, verifyToken };
