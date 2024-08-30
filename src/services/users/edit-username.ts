import { editUsername } from "../../database/user";
import { getTokenDetails } from "../../helpers/jwt";
import { TokenDetails } from "../../models/user/user-interfaces";

const editUsernameService = async ({
  accessToken,
  username,
}: {
  accessToken: string;
  username: string;
}) => {
  try {
    const tokenDetails = (await getTokenDetails(accessToken)) as TokenDetails;
    if (!tokenDetails) throw new Error("Unauthorized");

    const res = await editUsername({
      userId: tokenDetails?.userId,
      username
    });

    if (res) {
      return {
        res,
        err: null
      };
    }
  } catch (err) {
    return {
      res: null,
      err
    };
  }
};

export default editUsernameService;
