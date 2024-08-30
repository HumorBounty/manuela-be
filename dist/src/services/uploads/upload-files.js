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
const cloudinary_1 = require("../../helpers/cloudinary");
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadFilesService = ({ files }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadPromises = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const isImage = file.mimetype.startsWith("image/");
            if (!isImage)
                throw Error("File is not an image");
            const processedImageBuffer = yield (0, sharp_1.default)(file.path)
                .resize(300)
                .toBuffer();
            const processedFileName = `processed_image_${Date.now()}.jpg`;
            const saveDirectory = path_1.default.join(__dirname, "../../assets");
            if (!fs_1.default.existsSync(saveDirectory)) {
                fs_1.default.mkdirSync(saveDirectory, { recursive: true });
            }
            const processedFilePath = path_1.default.join(saveDirectory, processedFileName);
            // Wait for the local file to be written before proceeding
            yield new Promise((resolve, reject) => {
                fs_1.default.writeFile(processedFilePath, processedImageBuffer, (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve("test");
                });
            });
            const uploadedFile = yield (0, cloudinary_1.uploadImage)(processedFilePath);
            return uploadedFile.url;
        }));
        // Wait for all upload promises to complete
        const uploadedUrls = yield Promise.all(uploadPromises);
        // Remove all files from the assets folder
        const assetsDirectory = path_1.default.join(__dirname, "../../assets");
        if (fs_1.default.existsSync(assetsDirectory)) {
            fs_1.default.readdirSync(assetsDirectory).forEach((file) => {
                fs_1.default.unlinkSync(path_1.default.join(assetsDirectory, file));
            });
        }
        return uploadedUrls;
    }
    catch (err) {
        console.error("Error:", err);
        throw err; // Rethrow the error to be caught by the caller
    }
});
exports.default = uploadFilesService;
//# sourceMappingURL=upload-files.js.map