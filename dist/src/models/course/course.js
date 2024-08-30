"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const createCourse = (payload) => {
    const { title, description, status, tags, stages, createdAt } = payload;
    // Validate required fields
    if (!title) {
        throw new Error("title is required.");
    }
    if (!tags) {
        throw new Error("tags is required.");
    }
    if (!status) {
        throw new Error("status is required.");
    }
    if (!stages) {
        throw new Error("stages is required.");
    }
    if (!createdAt) {
        throw new Error("createdAt is required.");
    }
    return {
        title,
        description,
        tags,
        status,
        stages,
        createdAt,
    };
};
exports.createCourse = createCourse;
//# sourceMappingURL=course.js.map