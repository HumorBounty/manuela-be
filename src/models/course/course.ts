import { Course } from "./course-interfaces";

export const createCourse = (payload: Course) => {
  const { title, description, status, tags, stages, createdAt } = payload;

  // Validate required fields
  if (!title) {
    throw new Error("title is required.");
  }

  if (!tags) {
    throw new Error("tags is required.");
  }

  if (!status) {
    throw new Error("status is required.");
  }

  if (!stages) {
    throw new Error("stages is required.");
  }

  if (!createdAt) {
    throw new Error("createdAt is required.");
  }

  return {
    title,
    description,
    tags,
    status,
    stages,
    createdAt,
  };
};
