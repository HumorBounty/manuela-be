"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenDetails = exports.verifyAccessToken = exports.signAccessToken = void 0;
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const JWT_ENV = config_1.default.get("jwt");
const signAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        const secret = JWT_ENV.refreshTokenSecret;
        jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "50m" }, (err, token) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.signAccessToken = signAccessToken;
const verifyAccessToken = (authHeader) => __awaiter(void 0, void 0, void 0, function* () {
    const token = authHeader && authHeader.split(" ")[1];
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.default.verify(token, JWT_ENV.refreshTokenSecret, (err, payload) => {
            if (err) {
                reject(err);
            }
            else {
                return resolve(payload);
            }
        });
    });
});
exports.verifyAccessToken = verifyAccessToken;
const getTokenDetails = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const details = yield (0, jwt_decode_1.default)(token);
    return details;
});
exports.getTokenDetails = getTokenDetails;
//# sourceMappingURL=jwt.js.map