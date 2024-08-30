import {
  HttpRequest,
} from "../../utils/global-interfaces";
import getPostsListService from "../../services/posts/get-posts-list"
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";

export const getPostsListController = async (httpRequest: HttpRequest) => {
  try {
    // validate auth token
    if (!httpRequest.headers.authorization) {
      throw new Error("Unauthorized");
    }

    const { res, err } = await getPostsListService(httpRequest.pathParams.userId);

    if (res) {
      return makeHttpSuccess({
        statusCode: 200,
        message: "Posts fetched successfully",
        data: res
      });
    }
    return makeHttpError({
      statusCode: 400,
      message: err.message,
    });
  } catch(err: any) {
    return makeHttpError({
      statusCode: 400,
      message: err.message
    });
  }
}