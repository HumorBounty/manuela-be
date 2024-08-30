import { Post } from "./post-types";

export const createPost = (payload: Post) => {
  const { caption, attachedImage, owner, status, createdAt } = payload;

  // Validate required fields
  if (!attachedImage) {
    throw new Error("attachedImage is required.");
  }

  if (!status) {
    throw new Error("status is required.");
  }

  if (!owner) {
    throw new Error("owner is required.");
  }

  if (!createdAt) {
    throw new Error("createdAt is required.");
  }

  return {
    caption,
    attachedImage,
    owner,
    status,
    createdAt,
  };
};
