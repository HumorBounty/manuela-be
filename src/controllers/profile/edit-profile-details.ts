import editProfileDetailsService from "../../services/profiles/edit-profile-details";
import { adaptSuccessMessage } from "../../helpers/adapt-message";
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import {
  HttpRequest,
  ServiceError,
  ServiceResponse,
} from "../../utils/global-interfaces";

export const editProfileDetailsController = async (httpRequest: HttpRequest) => {
  try {
    // validate auth token
    if (!httpRequest.headers.authorization) {
      throw new Error("Unauthorized");
    }

    const { res, err }: ServiceResponse = await editProfileDetailsService({
      accessToken: httpRequest.headers.authorization,
      payload: httpRequest.body
    });

    if (res) {
      return makeHttpSuccess({
        statusCode: 200,
        message: adaptSuccessMessage("Profile"),
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
