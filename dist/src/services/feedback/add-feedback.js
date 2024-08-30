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
const feedback_1 = require("../../database/feedback");
const constants_1 = __importDefault(require("../../helpers/constants"));
const addFeedbackService = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validPayload = {
            data: request.payload,
            createdAt: new Date(),
        };
        const feedbackData = yield (0, feedback_1.addFeedback)(validPayload);
        if (!feedbackData) {
            throw new Error(constants_1.default.DB_TRIGGER_ERROR);
        }
        return {
            res: feedbackData,
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
exports.default = addFeedbackService;
//# sourceMappingURL=add-feedback.js.map