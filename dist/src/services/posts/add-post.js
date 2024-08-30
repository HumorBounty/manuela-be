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
const jwt_1 = require("../../helpers/jwt");
const post_1 = __importDefault(require("../../models/post"));
const post_2 = require("../../database/post");
const constants_1 = __importDefault(require("../../helpers/constants"));
;
const addPostService = ({ request, accessToken }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenDetails = yield (0, jwt_1.getTokenDetails)(accessToken);
        if (!tokenDetails)
            throw new Error("Error in decoding accessToken");
        const payload = Object.assign(Object.assign({}, request), { owner: {
                userId: tokenDetails.userId
            }, createdAt: new Date() });
        const postData = yield (0, post_2.addPost)((0, post_1.default)(payload));
        if (!postData) {
            throw new Error(constants_1.default.DB_TRIGGER_ERROR);
        }
        return {
            res: postData,
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
exports.default = addPostService;
//# sourceMappingURL=add-post.js.map