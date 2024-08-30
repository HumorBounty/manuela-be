import { getTokenDetails } from "../../helpers/jwt";
import createPost from "../../models/post";
import { addPost } from "../../database/post";
import constants from "../../helpers/constants";
import { ServiceRequest, TokenDetails } from "../../utils/global-interfaces";

interface Params {
  request: ServiceRequest;
  accessToken: string;
};

const addPostService = async ({request, accessToken}: Params) => {
  try {
    const tokenDetails = await getTokenDetails(accessToken) as TokenDetails;
    if(!tokenDetails) throw new Error("Error in decoding accessToken");

    const payload = {
      ...request,
      owner: {
        userId: tokenDetails.userId
      },
      createdAt: new Date(),
    };
    const postData = await addPost(createPost(payload));
    if (!postData) {
      throw new Error(constants.DB_TRIGGER_ERROR);
    }

    return {
      res: postData,
      err: null,
    };
  } catch (err) {
    return {
      res: null,
      err,
    };
  }
};

export default addPostService;
