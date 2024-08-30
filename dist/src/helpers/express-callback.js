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
const adapt_request_1 = __importDefault(require("./adapt-request"));
function makeExpressCallback(controller) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        const httpRequest = (0, adapt_request_1.default)(req);
        try {
            const httpResult = yield controller(httpRequest);
            res
                .set(httpResult === null || httpResult === void 0 ? void 0 : httpResult.headers)
                .status(httpResult === null || httpResult === void 0 ? void 0 : httpResult.statusCode)
                .send({
                statusCode: httpResult === null || httpResult === void 0 ? void 0 : httpResult.statusCode,
                message: httpResult === null || httpResult === void 0 ? void 0 : httpResult.message,
                success: httpResult === null || httpResult === void 0 ? void 0 : httpResult.success,
                data: httpResult === null || httpResult === void 0 ? void 0 : httpResult.data,
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).end();
        }
    });
}
exports.default = makeExpressCallback;
//# sourceMappingURL=express-callback.js.map