import express from "express";
import multer from "multer";
import path from "path";
import { editAuditLogController } from "../controllers/audit-log/edit-audit-log";
import { addFeedbackController } from "../controllers/feedback/add-feedback";
import { addPostController } from "../controllers/posts/add-post";
import { getPostsListController } from "../controllers/posts/get-posts-list";
import { uploadFilesController } from "../controllers/posts/upload-files";
import { editProfileDetailsController } from "../controllers/profile/edit-profile-details";
import { editProfileImageController } from "../controllers/profile/edit-profile-image";
import { editUserRoleController } from "../controllers/users/edit-user-role";
import { getUserRoleController } from "../controllers/users/get-user-role";
import { loginGoogleController } from "../controllers/users/login-google-user";
import { loginUserController } from "../controllers/users/login-user";
import { logoutController } from "../controllers/users/logout-user";
import { registerUserController } from "../controllers/users/register-user";
import { verifyUserAccessController } from "../controllers/users/verify-user-access";
import makeExpressCallback from "../helpers/express-callback";
const router = express.Router();

// multer configuration
// @upload -> ../assets
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "assets");
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname + path.extname(file.originalname));
  },
});

// Configure upload for multiple files
// Specify the field name and maximum number of files allowed
const upload = multer({ storage }).array("files", 8);
const multipleUploads = multer({ storage }).fields([
  { name: "files", maxCount: 8 },
  { name: "existingFiles", maxCount: 8 },
]);

// User API
router.post("/user/login/google", makeExpressCallback(loginGoogleController));
router.post("/user/login", makeExpressCallback(loginUserController));
router.post("/user/register", makeExpressCallback(registerUserController));
router.post("/user/logout", makeExpressCallback(logoutController));
router.get(
  "/user/verify-access",
  makeExpressCallback(verifyUserAccessController)
);
router.get("/user/role/get", makeExpressCallback(getUserRoleController));
router.patch("/user/role/edit", makeExpressCallback(editUserRoleController));

// Post API
router.get("/post/list/:userId", makeExpressCallback(getPostsListController));
router.post("/post/add", makeExpressCallback(addPostController));
router.post(
  "/post/files/upload",
  upload,
  makeExpressCallback(uploadFilesController)
);

// Profile API
router.patch(
  "/profile/upload-image",
  upload,
  makeExpressCallback(editProfileImageController)
);
router.patch(
  "/profile/edit",
  makeExpressCallback(editProfileDetailsController)
);

// Audit log API
router.patch("/audit-log", makeExpressCallback(editAuditLogController));

// Feedback API
router.post("/feedback/add", makeExpressCallback(addFeedbackController));

export { router };
