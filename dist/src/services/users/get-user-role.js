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
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../database/user");
const jwt_1 = require("../../helpers/jwt");
const getUserRoleService = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenDetails = (yield (0, jwt_1.getTokenDetails)(accessToken));
    if (!tokenDetails)
        throw new Error("Unauthorized");
    try {
        const res = yield (0, user_1.getUserRole)(tokenDetails.userId);
        if (!res)
            throw new Error("No user role");
        return { res, err: null };
    }
    catch (err) {
        return { err, res: null };
    }
});
exports.default = getUserRoleService;
//# sourceMappingURL=get-user-role.js.map