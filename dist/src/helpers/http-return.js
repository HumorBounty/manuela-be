"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHttpSuccess = exports.makeHttpError = void 0;
const makeHttpError = ({ message, statusCode = 500, cookie = null, }) => {
    return {
        headers: {
            "Content-Type": "application/json",
        },
        statusCode: statusCode,
        cookie: cookie,
        success: false,
        message,
        data: null,
    };
};
exports.makeHttpError = makeHttpError;
const makeHttpSuccess = ({ statusCode, message, data, cookie = null, }) => {
    return {
        headers: {
            "Content-Type": "application/json",
        },
        statusCode,
        cookie,
        success: true,
        message,
        data,
    };
};
exports.makeHttpSuccess = makeHttpSuccess;
//# sourceMappingURL=http-return.js.map