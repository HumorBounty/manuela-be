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
exports.editProfileImage = exports.editProfileDetails = exports.addProfile = exports.getProfileByEmail = exports.getProfileByUserQuery = exports.getProfileQuery = exports.removeProfileQuery = exports.listProfileQuery = void 0;
const mongodb_1 = require("mongodb");
const index_1 = __importDefault(require("./index"));
const database = (0, index_1.default)();
const listProfileQuery = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db.collection("profiles").find({}).toArray();
    return result;
});
exports.listProfileQuery = listProfileQuery;
const removeProfileQuery = ({ profileId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db
        .collection("profiles")
        .deleteOne({ _id: new mongodb_1.ObjectId(profileId) });
    return result;
});
exports.removeProfileQuery = removeProfileQuery;
const getProfileQuery = ({ userId, profileId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const query = userId
        ? {
            userId: new mongodb_1.ObjectId(userId),
        }
        : profileId
            ? { _id: new mongodb_1.ObjectId(profileId) }
            : null;
    if (!query)
        throw new Error("Both userId and profileId are missing.");
    const result = yield db.collection("profiles").findOne(query);
    return result;
});
exports.getProfileQuery = getProfileQuery;
const getProfileByUserQuery = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db
        .collection("profiles")
        .findOne({ userId: new mongodb_1.ObjectId(userId) });
    return result;
});
exports.getProfileByUserQuery = getProfileByUserQuery;
const getProfileByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    return yield db.collection("profiles").findOne({
        email,
    });
});
exports.getProfileByEmail = getProfileByEmail;
const addProfile = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { profileId } = _a, profile = __rest(_a, ["profileId"]);
    const db = yield database;
    if (profileId) {
        profile._id = new mongodb_1.ObjectId(profileId);
    }
    const result = yield db.collection("profiles").insertOne(profile);
    return {
        success: !!result.acknowledged,
        insertedId: result.insertedId,
    };
});
exports.addProfile = addProfile;
const editProfileDetails = ({ userId, payload }) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db
        .collection("profiles")
        .updateOne({ userId: new mongodb_1.ObjectId(userId) }, { $set: {
            bio: payload.bio,
            gender: payload.gender
        }
    });
    return result;
});
exports.editProfileDetails = editProfileDetails;
const editProfileImage = ({ userId, profileImage }) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database;
    const result = yield db
        .collection("profiles")
        .updateOne({ userId: new mongodb_1.ObjectId(userId) }, { $set: { profileImage } });
    return result;
});
exports.editProfileImage = editProfileImage;
//# sourceMappingURL=profile.js.map