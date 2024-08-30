"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function adaptRequest(req) {
    return Object.freeze({
        path: req.path,
        method: req.method,
        pathParams: req.params,
        queryParams: req.query,
        headers: req.headers,
        body: req.body,
        files: req.files,
        existingFiles: req.existingFiles,
    });
}
exports.default = adaptRequest;
//# sourceMappingURL=adapt-request.js.map