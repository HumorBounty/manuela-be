"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const createUser = (payload) => {
    const { firstName, lastName, email, username, password, type, isVerified, createdAt } = payload;
    // Validate required fields
    if (!email) {
        throw new Error("email is required.");
    }
    if (!password) {
        throw new Error("password is required.");
    }
    if (!createdAt) {
        throw new Error("createdAt is required.");
    }
    return {
        firstName,
        lastName,
        username,
        email,
        password,
        type,
        isVerified,
        createdAt,
    };
};
exports.createUser = createUser;
//# sourceMappingURL=user.js.map