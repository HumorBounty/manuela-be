import constants from "../../helpers/constants";
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import loginGoogleService from "../../services/users/login-google-user";
import {
  HttpRequest,
  ServiceError,
  ServiceResponse,
} from "../../utils/global-interfaces";

export const loginGoogleController = async (httpRequest: HttpRequest) => {
  try {
    const { res, err }: ServiceResponse = await loginGoogleService(
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
