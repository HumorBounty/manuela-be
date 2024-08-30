import constants from "../../helpers/constants";
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import verifyUserAccessService from "../../services/users/verify-user-access";
import {
  HttpRequest,
  ServiceError,
  ServiceResponse,
} from "../../utils/global-interfaces";

export const verifyUserAccessController = async (httpRequest: HttpRequest) => {
  try {
    // validate auth token
    if (!httpRequest.headers.authorization) {
      throw new Error(constants.ERROR_UNAUTHORIZED);
    }

    const { res, err }: ServiceResponse = await verifyUserAccessService(
      httpRequest.headers.authorization
    );

    if (res) {
      return makeHttpSuccess({
        statusCode: 200,
        message: "",
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
