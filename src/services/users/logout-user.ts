import { removeTokenQuery } from "../../database/user";
import constants from "../../helpers/constants";
import { getTokenDetails } from "../../helpers/jwt";
import { TokenDetails } from "../../models/user/user-interfaces";

const logoutUserService = async (request: any) => {
  try {
    const { accessToken } = request;
    const tokenDetails = (await getTokenDetails(accessToken)) as TokenDetails;
    const res = await removeTokenQuery({
      userId: tokenDetails.userId,
      accessToken: accessToken,
    });
    if (!res) {
      throw new Error(constants.DB_TRIGGER_ERROR);
    }

    return {
      res,
      err: null,
    };
  } catch (err) {
    return {
      res: null,
      err,
    };
  }
};

export default logoutUserService;
