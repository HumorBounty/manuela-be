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
const user_1 = require("../database/user");
const get_profile_1 = __importDefault(require("../services/profiles/get-profile"));
const jwt_1 = require("./jwt");
const signLoginToken = (auth, getUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = getUser || {};
    // get profile if there"s an existing user
    let profile = null;
    if (_id) {
        profile = yield (0, get_profile_1.default)({
            userId: _id,
        });
    }
    // sign access token and return
    const requestData = {
        userId: (auth === null || auth === void 0 ? void 0 : auth.userId) || _id,
        name: `${(auth === null || auth === void 0 ? void 0 : auth.firstName) || (profile === null || profile === void 0 ? void 0 : profile.firstName)}`,
        profileId: (auth === null || auth === void 0 ? void 0 : auth.profileId) || (profile === null || profile === void 0 ? void 0 : profile._id),
        role: (auth === null || auth === void 0 ? void 0 : auth.role) || (profile === null || profile === void 0 ? void 0 : profile.role),
    };
    const accessToken = yield (0, jwt_1.signAccessToken)(requestData);
    // store sign access token to DB
    yield (0, user_1.storeTokenQuery)({
        userId: requestData.userId,
        profileId: requestData === null || requestData === void 0 ? void 0 : requestData.profileId,
        accessToken,
        role: requestData.role,
    });
    // returned data for login request
    const data = {
        userId: requestData.userId,
        accessToken,
    };
    return data;
});
exports.default = signLoginToken;
//# sourceMappingURL=sign-login-token.js.map