import { User } from "./user-interfaces";

export const createUser = (payload: User) => {
  const {
    firstName,
    role,
    lastName,
    email,
    username,
    password,
    type,
    isVerified,
    createdAt,
  } = payload;

  // Validate required fields
  if (!email) {
    throw new Error("email is required.");
  }

  if (!password) {
    throw new Error("password is required.");
  }

  if (!createdAt) {
    throw new Error("createdAt is required.");
  }

  return {
    firstName,
    lastName,
    role,
    username,
    email,
    password,
    type,
    isVerified,
    createdAt,
  };
};
