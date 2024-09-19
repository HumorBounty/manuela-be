"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const edit_audit_log_1 = require("../controllers/audit-log/edit-audit-log");
const add_feedback_1 = require("../controllers/feedback/add-feedback");
const add_post_1 = require("../controllers/posts/add-post");
const get_posts_list_1 = require("../controllers/posts/get-posts-list");
const upload_files_1 = require("../controllers/posts/upload-files");
const edit_profile_details_1 = require("../controllers/profile/edit-profile-details");
const edit_profile_image_1 = require("../controllers/profile/edit-profile-image");
const edit_user_role_1 = require("../controllers/users/edit-user-role");
const get_user_role_1 = require("../controllers/users/get-user-role");
const login_google_user_1 = require("../controllers/users/login-google-user");
const login_user_1 = require("../controllers/users/login-user");
const logout_user_1 = require("../controllers/users/logout-user");
const register_user_1 = require("../controllers/users/register-user");
const verify_user_access_1 = require("../controllers/users/verify-user-access");
const express_callback_1 = __importDefault(require("../helpers/express-callback"));
const router = express_1.default.Router();
exports.router = router;
// multer configuration
// @upload -> ../assets
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + path_1.default.extname(file.originalname));
    },
});
// Configure upload for multiple files
// Specify the field name and maximum number of files allowed
const upload = (0, multer_1.default)({ storage }).array("files", 8);
const multipleUploads = (0, multer_1.default)({ storage }).fields([
    { name: "files", maxCount: 8 },
    { name: "existingFiles", maxCount: 8 },
]);
// User API
router.post("/user/login/google", (0, express_callback_1.default)(login_google_user_1.loginGoogleController));
router.post("/user/login", (0, express_callback_1.default)(login_user_1.loginUserController));
router.post("/user/register", (0, express_callback_1.default)(register_user_1.registerUserController));
router.post("/user/logout", (0, express_callback_1.default)(logout_user_1.logoutController));
router.get("/user/verify-access", (0, express_callback_1.default)(verify_user_access_1.verifyUserAccessController));
router.get("/user/role/get", (0, express_callback_1.default)(get_user_role_1.getUserRoleController));
router.patch("/user/role/edit", (0, express_callback_1.default)(edit_user_role_1.editUserRoleController));
// Post API
router.get("/post/list/:userId", (0, express_callback_1.default)(get_posts_list_1.getPostsListController));
router.post("/post/add", (0, express_callback_1.default)(add_post_1.addPostController));
router.post("/post/files/upload", upload, (0, express_callback_1.default)(upload_files_1.uploadFilesController));
// Profile API
router.patch("/profile/upload-image", upload, (0, express_callback_1.default)(edit_profile_image_1.editProfileImageController));
router.patch("/profile/edit", (0, express_callback_1.default)(edit_profile_details_1.editProfileDetailsController));
// Audit log API
router.patch("/audit-log", (0, express_callback_1.default)(edit_audit_log_1.editAuditLogController));
// Feedback API
router.post("/feedback/add", (0, express_callback_1.default)(add_feedback_1.addFeedbackController));
//# sourceMappingURL=api.js.map