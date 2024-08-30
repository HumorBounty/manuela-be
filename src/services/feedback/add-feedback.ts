import { addFeedback } from "../../database/feedback";
import constants from "../../helpers/constants";
import { ServiceRequest } from "../../utils/global-interfaces";

const addFeedbackService = async (request: ServiceRequest) => {
  try {
    const validPayload = {
      data: request.payload,
      createdAt: new Date(),
    };
    const feedbackData = await addFeedback(validPayload);
    if (!feedbackData) {
      throw new Error(constants.DB_TRIGGER_ERROR);
    }

    return {
      res: feedbackData,
      err: null,
    };
  } catch (err) {
    return {
      res: null,
      err,
    };
  }
};

export default addFeedbackService;
