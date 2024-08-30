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
const audit_log_1 = require("../../database/audit-log");
const user_1 = require("../../database/user");
const bcrypt_1 = require("../../helpers/bcrypt");
const user_2 = require("../../models/user/user");
const add_profile_1 = __importDefault(require("../profiles/add-profile"));
const registerUserService = (request, type) => __awaiter(void 0, void 0, void 0, function* () {
    // #1. Hash password
    const hashedPassword = yield (0, bcrypt_1.hash)({ plainPassword: request.password });
    // #2 Create user payload
    const newUser = (0, user_2.createUser)(Object.assign(Object.assign({}, request), { createdAt: new Date(), password: hashedPassword }));
    // #3 Check if there's an existing email
    const existingUser = yield (0, user_1.getUserByEmailQuery)(newUser.email);
    if (existingUser) {
        throw new Error("Email already exists.");
    }
    // #4 Store user
    const userRes = yield (0, user_1.saveUser)(newUser);
    // #5 Create and store user profile
    const { email, firstName, lastName, thumbnailImage, originalImage, role } = request;
    // Create audit log 1
    yield (0, audit_log_1.addAuditLogQuery)({
        userId: userRes === null || userRes === void 0 ? void 0 : userRes.insertedId,
        email,
        firstName,
        lastName,
        click_add_more_items: 0,
        click_free_plan: 0,
        click_pro_plan: 0,
        click_lookbook: 0,
        feedback: [],
    });
    const defaultImage = "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1700132879/generic_user_ypaurv.jpg";
    const profileData = {
        userId: userRes === null || userRes === void 0 ? void 0 : userRes.insertedId,
        firstName,
        lastName,
        role,
        email,
        contact: "",
        bio: "",
        gender: "",
        createdAt: new Date(),
        profileImage: {
            originalImage: originalImage || defaultImage,
            thumbnailImage: originalImage || defaultImage,
        },
    };
    const profileRes = yield (0, add_profile_1.default)(profileData);
    return Object.assign(Object.assign({}, profileData), { profileId: profileRes === null || profileRes === void 0 ? void 0 : profileRes.insertedId });
});
exports.default = registerUserService;
//# sourceMappingURL=register-user.js.map