import constants from "../../helpers/constants";
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import editUserRoleService from "../../services/users/edit-user-role";
import {
  HttpRequest,
  ServiceError,
  ServiceResponse,
} from "../../utils/global-interfaces";

export const editUserRoleController = async (httpRequest: HttpRequest) => {
  try {
    const { res, err }: ServiceResponse = await editUserRoleService({
      accessToken: httpRequest.headers.authorization,
      requestType: httpRequest.body.requestType,
    });

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
