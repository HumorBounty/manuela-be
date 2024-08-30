"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptFetchedMessage = exports.adaptEditMessage = exports.adaptDeleteMessage = exports.adaptSuccessMessage = void 0;
const adaptSuccessMessage = (subject) => {
    return `${subject} added successfully.`;
};
exports.adaptSuccessMessage = adaptSuccessMessage;
const adaptDeleteMessage = (subject) => {
    return `${subject} deleted successfully.`;
};
exports.adaptDeleteMessage = adaptDeleteMessage;
const adaptEditMessage = (subject) => {
    return `${subject} edited successfully.`;
};
exports.adaptEditMessage = adaptEditMessage;
const adaptFetchedMessage = (subject) => {
    return `${subject} fetched successfully.`;
};
exports.adaptFetchedMessage = adaptFetchedMessage;
//# sourceMappingURL=adapt-message.js.map