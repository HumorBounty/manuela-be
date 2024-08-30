import { uploadImage } from "../../helpers/cloudinary";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const uploadFilesService = async ({ files }: any) => {
  try {
    const uploadPromises = files.map(async (file: any) => {
      const isImage = file.mimetype.startsWith("image/");
      
      if (!isImage) throw Error("File is not an image");

      const processedImageBuffer = await sharp(file.path)
        .resize(300)
        .toBuffer();

      const processedFileName = `processed_image_${Date.now()}.jpg`;
      const saveDirectory = path.join(__dirname, "../../assets");
      
      if (!fs.existsSync(saveDirectory)) {
        fs.mkdirSync(saveDirectory, { recursive: true });
      }

      const processedFilePath = path.join(saveDirectory, processedFileName);

      // Wait for the local file to be written before proceeding
      await new Promise((resolve, reject) => {
        fs.writeFile(processedFilePath, processedImageBuffer, (err) => {
          if (err) reject(err);
          else resolve("test");
        });
      });

      const uploadedFile = await uploadImage(processedFilePath);
              
      return uploadedFile.url;
    });
    
    // Wait for all upload promises to complete
    const uploadedUrls = await Promise.all(uploadPromises);

    // Remove all files from the assets folder
    const assetsDirectory = path.join(__dirname, "../../assets");
    if (fs.existsSync(assetsDirectory)) {
      fs.readdirSync(assetsDirectory).forEach((file) => {
        fs.unlinkSync(path.join(assetsDirectory, file));
      });
    }

    return uploadedUrls;
  } catch (err) {
    console.error("Error:", err);
    throw err; // Rethrow the error to be caught by the caller
  }
};

export default uploadFilesService;