import { adaptSuccessMessage } from "../../helpers/adapt-message";
import { makeHttpError, makeHttpSuccess } from "../../helpers/http-return";
import addFeedbackService from "../../services/feedback/add-feedback";
import {
  HttpRequest,
  ServiceError,
  ServiceResponse,
} from "../../utils/global-interfaces";

export const addFeedbackController = async (httpRequest: HttpRequest) => {
  try {
    const { res, err }: ServiceResponse = await addFeedbackService({
      payload: httpRequest.body
    });

    if (res) {
      return makeHttpSuccess({
        statusCode: 200,
        message: adaptSuccessMessage("Feedback"),
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
