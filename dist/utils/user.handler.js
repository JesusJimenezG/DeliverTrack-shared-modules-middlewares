"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanedUser = void 0;
const cleanedUser = (user) => {
    if (!user)
        return null;
    if (user.password)
        delete user.password;
    return user;
};
exports.cleanedUser = cleanedUser;
