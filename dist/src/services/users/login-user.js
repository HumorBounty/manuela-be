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
const bcrypt_1 = require("../../helpers/bcrypt");
const user_1 = require("../../database/user");
const sign_login_token_1 = __importDefault(require("../../helpers/sign-login-token"));
const profile_1 = require("../../database/profile");
const loginUserService = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if email exist, login user
        const user = yield (0, user_1.getUserByEmailQuery)(request.email);
        if (!user)
            throw new Error("Email is not yet registered");
        // if user email and password matched, login the user
        const passwordMatch = yield (0, bcrypt_1.compare)(request.password, user.password);
        if (!passwordMatch) {
            throw new Error("Email or password is incorrect");
        }
        // sign in token and return
        const getUser = {
            _id: user._id.toString()
        };
        const res = yield (0, sign_login_token_1.default)(user, getUser);
        // get user profile and return profile image
        const profile = yield (0, profile_1.getProfileByEmail)(user.email);
        return {
            res: Object.assign(Object.assign({}, res), { userId: profile.userId, username: user === null || user === void 0 ? void 0 : user.username, email: user === null || user === void 0 ? void 0 : user.email, profileImage: profile.profileImage }),
            err: null,
        };
    }
    catch (err) {
        return {
            res: null,
            err,
        };
    }
});
exports.default = loginUserService;
//# sourceMappingURL=login-user.js.map