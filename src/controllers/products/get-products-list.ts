import getProductsListService from "services/products/get-products-list";
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import { HttpRequest } from "../../utils/global-interfaces";

export const getProductsListController = async (httpRequest: HttpRequest) => {
  try {
    // validate auth token
    if (!httpRequest.headers.authorization) {
      throw new Error("Unauthorized");
    }

    const { res, err } = await getProductsListService(
      httpRequest.headers.authorization
    );

    if (res) {
      return makeHttpSuccess({
        statusCode: 200,
        message: "Posts fetched successfully",
        data: res,
      });
    }
    return makeHttpError({
      statusCode: 400,
      message: err.message,
    });
  } catch (err: any) {
    return makeHttpError({
      statusCode: 400,
      message: err.message,
    });
  }
};
