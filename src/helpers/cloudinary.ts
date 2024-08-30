import * as cloudinary from "cloudinary"

const uploadFile = async (path: string, resourceType: 'image' | 'video' | 'raw' | 'auto') => {
  const result = await cloudinary.v2.uploader.upload(path, {
    resource_type: resourceType,
    use_filename: true
  });
  return result;
};

const uploadImage = async (path: string) => {
  return uploadFile(path, 'image');
};

const uploadVideo = async (path: string) => {
  return uploadFile(path, 'video');
};

export {
  uploadImage,
  uploadVideo
};