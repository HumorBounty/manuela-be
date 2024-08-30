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
exports.getPostList = exports.getPost = exports.addPost = void 0;
const mongodb_1 = require("mongodb");
const _1 = __importDefault(require("."));
const database = (0, _1.default)();
const addPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db.collection("posts").insertOne(post);
    return {
        success: !!result.acknowledged,
        insertedId: result.insertedId,
    };
});
exports.addPost = addPost;
const getPost = (postId = "") => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const query = { _id: new mongodb_1.ObjectId(postId) };
    const result = yield db.collection("posts").findOne(query);
    return result;
});
exports.getPost = getPost;
const getPostList = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const query = { "owner.userId": userId };
    const result = yield db.collection("posts").find(query).sort({ createdAt: -1 }).toArray();
    return result;
});
exports.getPostList = getPostList;
//# sourceMappingURL=post.js.map