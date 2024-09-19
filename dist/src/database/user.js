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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRole = exports.getTokenQuery = exports.removeTokenQuery = exports.storeTokenQuery = exports.insertUserProfile = exports.getUserByEmailQuery = exports.editUsername = exports.getUserQuery = exports.getUsersList = exports.editUserRole = exports.saveUser = void 0;
const mongodb_1 = require("mongodb");
const index_1 = __importDefault(require("./index"));
const database = (0, index_1.default)();
const saveUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    let userExist;
    if (user._id) {
        userExist = yield db
            .collection("users")
            .findOne({ _id: new mongodb_1.ObjectId(user._id) });
    }
    let result;
    if (!userExist) {
        result = yield db.collection("users").insertOne(Object.assign({}, user));
    }
    else {
        result = {
            acknowledged: true,
            insertedId: userExist._id,
        };
    }
    return {
        success: !!result.acknowledged,
        insertedId: result.insertedId,
    };
});
exports.saveUser = saveUser;
const editUserRole = ({ userId, role, }) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db.collection("users").updateOne({ _id: new mongodb_1.ObjectId(userId) }, {
        $set: {
            role,
        },
    });
    return result;
});
exports.editUserRole = editUserRole;
const getUsersList = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const query = {};
    const result = yield db.collection("users").find(query).toArray();
    return result;
});
exports.getUsersList = getUsersList;
const getUserQuery = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    return yield db.collection("users").findOne({ _id: new mongodb_1.ObjectId(userId) });
});
exports.getUserQuery = getUserQuery;
const editUsername = ({ userId, username }) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db
        .collection("users")
        .updateOne({ _id: new mongodb_1.ObjectId(userId) }, { $set: { username } });
    return result;
});
exports.editUsername = editUsername;
const getUserByEmailQuery = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    return yield db.collection("users").findOne({
        email: email,
    });
});
exports.getUserByEmailQuery = getUserByEmailQuery;
const insertUserProfile = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db
        .collection("users")
        .updateOne({ _id: new mongodb_1.ObjectId(data.userId) }, { $set: { profileId: data.profileId } });
    return result;
});
exports.insertUserProfile = insertUserProfile;
const storeTokenQuery = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var data = __rest(_a, []);
    const db = yield database;
    const result = yield db.collection("access_tokens").insertOne(Object.assign({ userId: new mongodb_1.ObjectId(data.userId) }, data));
    return {
        success: !!result.acknowledged,
        insertedId: result.insertedId,
    };
});
exports.storeTokenQuery = storeTokenQuery;
const removeTokenQuery = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db.collection("access_tokens").deleteOne({
        userId: new mongodb_1.ObjectId(data.userId),
    });
    return result;
});
exports.removeTokenQuery = removeTokenQuery;
const getTokenQuery = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db.collection("access_tokens").findOne({
        userId: new mongodb_1.ObjectId(userId),
    });
    return result;
});
exports.getTokenQuery = getTokenQuery;
const getUserRole = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db.collection("users").findOne({
        _id: new mongodb_1.ObjectId(userId),
    });
    return result === null || result === void 0 ? void 0 : result.role;
});
exports.getUserRole = getUserRole;
//# sourceMappingURL=user.js.map