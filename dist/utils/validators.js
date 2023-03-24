"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidate = exports.emailValidate = exports.userValidate = void 0;
const userValidate = (email, password) => {
    if (!(0, exports.emailValidate)(email)) {
        throw new Error('Invalid email');
    }
    if (!(0, exports.passwordValidate)(password)) {
        throw new Error('Password is required');
    }
    return true;
};
exports.userValidate = userValidate;
const emailValidate = (email) => {
    if (!email) {
        throw new Error('Email is required');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.emailValidate = emailValidate;
const passwordValidate = (password) => {
    if (!password) {
        throw new Error('Password is required');
    }
    if (password.length < 4) {
        throw new Error('Password must be at least 6 characters long');
    }
    return true;
};
exports.passwordValidate = passwordValidate;
