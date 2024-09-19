import { addAuditLogQuery } from "../../database/audit-log";
import { getUserByEmailQuery, saveUser } from "../../database/user";
import { hash } from "../../helpers/bcrypt";
import { createUser } from "../../models/user/user";
import addProfileService from "../profiles/add-profile";

const registerUserService = async (request: any, type: "sso" | "email") => {
  // #1. Hash password
  const hashedPassword = await hash({ plainPassword: request.password });

  // #2 Create user payload
  const newUser = createUser({
    ...request,
    role: {
      isBusinessAccount: false,
      type: "BASIC",
    },
    createdAt: new Date(),
    password: hashedPassword,
  });

  // #3 Check if there's an existing email
  const existingUser = await getUserByEmailQuery(newUser.email);
  if (existingUser) {
    throw new Error("Email already exists.");
  }

  // #4 Store user
  const userRes = await saveUser(newUser);

  // #5 Create and store user profile
  const { email, firstName, lastName, thumbnailImage, originalImage, role } =
    request;

  // Create audit log 1
  await addAuditLogQuery({
    userId: userRes?.insertedId,
    email,
    firstName,
    lastName,
    click_add_more_items: 0,
    click_free_plan: 0,
    click_pro_plan: 0,
    click_lookbook: 0,
    feedback: [],
  });

  const defaultImage =
    "https://res.cloudinary.com/dqrtlfjc0/image/upload/v1700132879/generic_user_ypaurv.jpg";

  const profileData = {
    userId: userRes?.insertedId,
    firstName,
    lastName,
    role,
    email,
    contact: "",
    bio: "",
    gender: "",
    createdAt: new Date(),
    profileImage: {
      originalImage: originalImage || defaultImage,
      thumbnailImage: originalImage || defaultImage,
    },
  };
  const profileRes: any = await addProfileService(profileData);

  return {
    ...profileData,
    profileId: profileRes?.insertedId,
  };
};

export default registerUserService;
