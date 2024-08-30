import loginUserService from "../../services/users/login-user";
import constants from "../../helpers/constants";
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import {
  HttpRequest,
  ServiceError,
  ServiceResponse,
} from "../../utils/global-interfaces";

export const loginUserController = async (httpRequest: HttpRequest) => {
  try {
    const { res, err }: ServiceResponse = await loginUserService(
      httpRequest.body
    );

    if (res) {
      return makeHttpSuccess({
        statusCode: 200,
        message: constants.LOGIN_SUCCESS,
        data: res,
      });
    }
    return makeHttpError({
      statusCode: 400,
      message: err.message,
    });
  } catch (err: ServiceError) {
    return makeHttpError({
      statusCode: 400,
      message: err.message,
    });
  }
};
