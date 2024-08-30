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
const jwt_1 = require("../../helpers/jwt");
const edit_username_1 = __importDefault(require("../users/edit-username"));
const editProfileDetailsService = ({ accessToken, payload, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenDetails = (yield (0, jwt_1.getTokenDetails)(accessToken));
        if (!tokenDetails)
            throw new Error("Unauthorized");
        // edit username from users service
        yield (0, edit_username_1.default)({
            accessToken,
            username: payload.username
        });
        // edit profile details
        const res = yield (0, profile_1.editProfileDetails)({
            userId: tokenDetails === null || tokenDetails === void 0 ? void 0 : tokenDetails.userId,
            payload
        });
        if (res) {
            return {
                res,
                err: null
            };
        }
    }
    catch (err) {
        return {
            res: null,
            err
        };
    }
});
exports.default = editProfileDetailsService;
//# sourceMappingURL=edit-profile-details.js.map