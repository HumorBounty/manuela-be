import { GoogleSigninRequest } from "models/user/user-interfaces";
import { getProfileByEmail } from "../../database/profile";
import { getUserByEmailQuery } from "../../database/user";
import constants from "../../helpers/constants";
import signLoginToken from "../../helpers/sign-login-token";
import registerUserService from "./register-user";

const loginGoogleService = async (request: GoogleSigninRequest) => {
  try {
    // check user's email existence
    const existingUser = await getUserByEmailQuery(request.email);

    // If email doesn"t exist, create a new user
    let auth = null;
    if (!existingUser) {
      const { firstName, lastName, email, username } = request || {};
      const user = {
        firstName,
        lastName,
        email,
        username,
        password: "test",
        type: "google",
        role: "USER",
        thumbnailImage: constants.DEFAULT_USER_IMAGE,
        originalImage: constants.DEFAULT_USER_IMAGE,
        isVerified: 1,
      };
      auth = await registerUserService(user, "sso");
      if (auth?.userId) {
        const signedTokenData = await signLoginToken(auth, existingUser);

        return {
          res: {
            ...signedTokenData,
            email,
            profileImage: {
              thumbnailImage: user.thumbnailImage,
              originalImage: user.originalImage,
            },
          },
          err: null,
        };
      }
    }

    // sign token and get user profile
    const signedTokenData = await signLoginToken(auth, existingUser);
    const profile = await getProfileByEmail(existingUser?.email);

    return {
      res: {
        ...signedTokenData,
        userId: profile?.userId,
        username: existingUser?.username ?? "",
        email: existingUser?.email,
        profileImage: profile.profileImage,
      },
      err: null,
    };
  } catch (err) {
    return {
      res: null,
      err,
    };
  }
};

export default loginGoogleService;
