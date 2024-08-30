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
exports.editAuditLogController = void 0;
const audit_log_1 = require("../../database/audit-log");
const adapt_message_1 = require("../../helpers/adapt-message");
const constants_1 = __importDefault(require("../../helpers/constants"));
const http_return_1 = require("../../helpers/http-return");
const jwt_1 = require("../../helpers/jwt");
const editAuditLogController = (httpRequest) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!httpRequest.headers.authorization) {
            throw new Error(constants_1.default.ERROR_UNAUTHORIZED);
        }
        const tokenDetails = (yield (0, jwt_1.getTokenDetails)(httpRequest.headers.authorization));
        if (!tokenDetails)
            throw new Error("No Token Details");
        const res = (0, audit_log_1.editAuditLogQuery)({
            userId: tokenDetails === null || tokenDetails === void 0 ? void 0 : tokenDetails.userId,
            payload: httpRequest.body,
        });
        return (0, http_return_1.makeHttpSuccess)({
            statusCode: 200,
            message: (0, adapt_message_1.adaptSuccessMessage)("Audit log"),
            data: res,
        });
    }
    catch (err) {
        return (0, http_return_1.makeHttpError)({
            statusCode: 400,
            message: err.message,
        });
    }
});
exports.editAuditLogController = editAuditLogController;
//# sourceMappingURL=edit-audit-log.js.map