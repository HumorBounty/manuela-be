import { getUserRole } from "../../database/user";
import { getTokenDetails } from "../../helpers/jwt";
import { TokenDetails } from "../../models/user/user-interfaces";

const getUserRoleService = async (accessToken: string) => {
  const tokenDetails = (await getTokenDetails(accessToken)) as TokenDetails;
  if (!tokenDetails) throw new Error("Unauthorized");

  try {
    const res = await getUserRole(tokenDetails.userId);
    if (!res) throw new Error("No user role");
    return { res, err: null };
  } catch (err) {
    return { err, res: null };
  }
};

export default getUserRoleService;
