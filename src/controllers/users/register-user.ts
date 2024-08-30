import signLoginToken from "../../helpers/sign-login-token";
import constants from "../../helpers/constants";
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import registerUserService from "../../services/users/register-user";
import { HttpRequest, ServiceError } from "../../utils/global-interfaces";

export const registerUserController = async (httpRequest: HttpRequest) => {
  try {
    const user = await registerUserService(httpRequest.body, "email");

    // sign token
    const res = await signLoginToken(user, user);

    if(res) {
      return makeHttpSuccess({
        statusCode: 200,
        message: constants.REGISTER_SUCCESS,
        data: {
          ...res,
          profileImage: user.profileImage,
          email: user.email
        },
      });
    }
    return makeHttpError({
      statusCode: 400,
      message: "Error",
    });
  } catch (err: ServiceError) {
    return makeHttpError({
      statusCode: 400,
      message: err.message,
    });
  }
};
