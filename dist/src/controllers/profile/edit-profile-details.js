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
exports.editProfileDetailsController = void 0;
const edit_profile_details_1 = __importDefault(require("../../services/profiles/edit-profile-details"));
const adapt_message_1 = require("../../helpers/adapt-message");
const http_return_1 = require("../../helpers/http-return");
const editProfileDetailsController = (httpRequest) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // validate auth token
        if (!httpRequest.headers.authorization) {
            throw new Error("Unauthorized");
        }
        const { res, err } = yield (0, edit_profile_details_1.default)({
            accessToken: httpRequest.headers.authorization,
            payload: httpRequest.body
        });
        if (res) {
            return (0, http_return_1.makeHttpSuccess)({
                statusCode: 200,
                message: (0, adapt_message_1.adaptSuccessMessage)("Profile"),
                data: res,
            });
        }
        return (0, http_return_1.makeHttpError)({
            statusCode: 400,
            message: err.message,
        });
    }
    catch (err) {
        return (0, http_return_1.makeHttpError)({
            statusCode: 400,
            message: err.message,
        });
    }
});
exports.editProfileDetailsController = editProfileDetailsController;
//# sourceMappingURL=edit-profile-details.js.map