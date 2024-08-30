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
exports.registerUserController = void 0;
const sign_login_token_1 = __importDefault(require("../../helpers/sign-login-token"));
const constants_1 = __importDefault(require("../../helpers/constants"));
const http_return_1 = require("../../helpers/http-return");
const register_user_1 = __importDefault(require("../../services/users/register-user"));
const registerUserController = (httpRequest) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, register_user_1.default)(httpRequest.body, "email");
        // sign token
        const res = yield (0, sign_login_token_1.default)(user, user);
        if (res) {
            return (0, http_return_1.makeHttpSuccess)({
                statusCode: 200,
                message: constants_1.default.REGISTER_SUCCESS,
                data: Object.assign(Object.assign({}, res), { profileImage: user.profileImage, email: user.email }),
            });
        }
        return (0, http_return_1.makeHttpError)({
            statusCode: 400,
            message: "Error",
        });
    }
    catch (err) {
        return (0, http_return_1.makeHttpError)({
            statusCode: 400,
            message: err.message,
        });
    }
});
exports.registerUserController = registerUserController;
//# sourceMappingURL=register-user.js.map