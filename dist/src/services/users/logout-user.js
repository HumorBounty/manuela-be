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
const user_1 = require("../../database/user");
const constants_1 = __importDefault(require("../../helpers/constants"));
const jwt_1 = require("../../helpers/jwt");
const logoutUserService = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accessToken } = request;
        const tokenDetails = (yield (0, jwt_1.getTokenDetails)(accessToken));
        const res = yield (0, user_1.removeTokenQuery)({
            userId: tokenDetails.userId,
            accessToken: accessToken,
        });
        if (!res) {
            throw new Error(constants_1.default.DB_TRIGGER_ERROR);
        }
        return {
            res,
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
exports.default = logoutUserService;
//# sourceMappingURL=logout-user.js.map