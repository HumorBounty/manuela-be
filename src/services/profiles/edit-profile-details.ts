import { editProfileDetails } from "../../database/profile";
import { getTokenDetails } from "../../helpers/jwt";
import { TokenDetails } from "../../models/user/user-interfaces";
import editUsernameService from "../users/edit-username";

const editProfileDetailsService = async ({
  accessToken,
  payload,
}: {
  accessToken: string;
  payload: any;
}) => {
  try {
    const tokenDetails = (await getTokenDetails(accessToken)) as TokenDetails;
    if (!tokenDetails) throw new Error("Unauthorized");

    // edit username from users service
    await editUsernameService({
      accessToken,
      username: payload.username
    });

    // edit profile details
    const res = await editProfileDetails({
      userId: tokenDetails?.userId,
      payload
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

export default editProfileDetailsService;
