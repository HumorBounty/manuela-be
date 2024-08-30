import { Feedback } from "./feedback-interfaces";

export const createFeedback = (payload: Feedback) => {
  const { createdAt } = payload;

  // Validate required fields
  if (!createdAt) {
    throw new Error("createdAt is required.");
  }

  return {
    createdAt,
  };
};
