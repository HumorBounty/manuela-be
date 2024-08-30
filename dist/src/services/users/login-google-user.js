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
const profile_1 = require("../../database/profile");
const user_1 = require("../../database/user");
const constants_1 = __importDefault(require("../../helpers/constants"));
const sign_login_token_1 = __importDefault(require("../../helpers/sign-login-token"));
const register_user_1 = __importDefault(require("./register-user"));
const loginGoogleService = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // check user's email existence
        const existingUser = yield (0, user_1.getUserByEmailQuery)(request.email);
        // If email doesn"t exist, create a new user
        let auth = null;
        if (!existingUser) {
            const { firstName, lastName, email, username } = request || {};
            const user = {
                firstName,
                lastName,
                email,
                username,
                password: "test",
                type: "google",
                role: "USER",
                thumbnailImage: constants_1.default.DEFAULT_USER_IMAGE,
                originalImage: constants_1.default.DEFAULT_USER_IMAGE,
                isVerified: 1,
            };
            auth = yield (0, register_user_1.default)(user, "sso");
            if (auth === null || auth === void 0 ? void 0 : auth.userId) {
                const signedTokenData = yield (0, sign_login_token_1.default)(auth, existingUser);
                return {
                    res: Object.assign(Object.assign({}, signedTokenData), { email, profileImage: {
                            thumbnailImage: user.thumbnailImage,
                            originalImage: user.originalImage,
                        } }),
                    err: null,
                };
            }
        }
        // sign token and get user profile
        const signedTokenData = yield (0, sign_login_token_1.default)(auth, existingUser);
        const profile = yield (0, profile_1.getProfileByEmail)(existingUser === null || existingUser === void 0 ? void 0 : existingUser.email);
        return {
            res: Object.assign(Object.assign({}, signedTokenData), { userId: profile === null || profile === void 0 ? void 0 : profile.userId, username: (_a = existingUser === null || existingUser === void 0 ? void 0 : existingUser.username) !== null && _a !== void 0 ? _a : "", email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email, profileImage: profile.profileImage }),
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
exports.default = loginGoogleService;
//# sourceMappingURL=login-google-user.js.map