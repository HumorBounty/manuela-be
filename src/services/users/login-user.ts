import { hash, compare } from "../../helpers/bcrypt";
import { getUserByEmailQuery } from "../../database/user";
import signLoginToken from "../../helpers/sign-login-token";
import { getProfileByEmail } from "../../database/profile";

interface Request {
  email: string;
  password: string;
}

const loginUserService = async (request: Request) => {
  try {
    // if email exist, login user
    const user = await getUserByEmailQuery(request.email)

    if(!user) throw new Error("Email is not yet registered");
    
    // if user email and password matched, login the user
    const passwordMatch = await compare(request.password, user.password) as any;

    if(!passwordMatch) {
      throw new Error("Email or password is incorrect");
    }

    // sign in token and return
    const getUser = {
      _id: user._id.toString()
    }

    const res = await signLoginToken(user, getUser);

    // get user profile and return profile image
    const profile = await getProfileByEmail(user.email);

    return {
      res: {
        ...res,
        userId: profile.userId,
        username: user?.username,
        email: user?.email,
        profileImage: profile.profileImage
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

export default loginUserService;
