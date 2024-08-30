import constants from "../../helpers/constants";
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import logoutUserService from "../../services/users/logout-user";
import {
  HttpRequest,
  ServiceError,
  ServiceResponse,
} from "../../utils/global-interfaces";

export const logoutController = async (httpRequest: HttpRequest) => {
  try {
    const { res, err }: ServiceResponse = await logoutUserService(
      httpRequest.body
    );

    if (res) {
      return makeHttpSuccess({
        statusCode: 200,
        message: constants.LOGOUT_SUCCESS,
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
