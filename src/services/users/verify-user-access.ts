import { getTokenQuery } from "../../database/user";
import constants from "../../helpers/constants";
import { getTokenDetails } from "../../helpers/jwt";
import { TokenDetails } from "../../models/user/user-interfaces";

const verifyUserAccessService = async (accessToken: string) => {
  try {
    const tokenDetails = (await getTokenDetails(accessToken)) as TokenDetails;
    if (!tokenDetails) throw new Error(constants.REQUIRED_TOKEN);

    const res = await getTokenQuery(tokenDetails?.userId ?? "");
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

export default verifyUserAccessService;
