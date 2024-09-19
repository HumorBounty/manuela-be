import addProductService from "services/products/add-product";
import { adaptSuccessMessage } from "../../helpers/adapt-message";
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import {
  HttpRequest,
  ServiceError,
  ServiceResponse,
} from "../../utils/global-interfaces";

export const addProductController = async (httpRequest: HttpRequest) => {
  try {
    // validate auth token
    if (!httpRequest.headers.authorization) {
      throw new Error("Unauthorized");
    }

    const { res, err }: ServiceResponse = await addProductService({
      request: httpRequest.body,
      accessToken: httpRequest.headers.authorization,
    });

    if (res) {
      return makeHttpSuccess({
        statusCode: 200,
        message: adaptSuccessMessage("Product"),
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
