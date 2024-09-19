import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import getUserRoleService from "../../services/users/get-user-role";
import {
  HttpRequest,
  ServiceError,
  ServiceResponse,
} from "../../utils/global-interfaces";

export const getUserRoleController = async (httpRequest: HttpRequest) => {
  try {
    const { res, err }: ServiceResponse = await getUserRoleService(
      httpRequest.headers.authorization
    );

    if (res) {
      return makeHttpSuccess({
        statusCode: 200,
        message: "User role fetched successfully!",
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
