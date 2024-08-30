"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeedback = void 0;
const createFeedback = (payload) => {
    const { createdAt } = payload;
    // Validate required fields
    if (!createdAt) {
        throw new Error("createdAt is required.");
    }
    return {
        createdAt,
    };
};
exports.createFeedback = createFeedback;
//# sourceMappingURL=feedback.js.map