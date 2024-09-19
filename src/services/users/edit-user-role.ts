import { editUserRole } from "../../database/user";
import { getTokenDetails } from "../../helpers/jwt";
import { TokenDetails } from "../../models/user/user-interfaces";

const editUserRoleService = async ({
  accessToken,
  requestType,
}: {
  accessToken: string;
  requestType: "CREATOR_TYPE" | "BUSINESS_TYPE" | "BASIC_TYPE";
}) => {
  try {
    const tokenDetails = (await getTokenDetails(accessToken)) as TokenDetails;
    if (!tokenDetails) throw new Error("Unauthorized");

    let role = {
      isBusinessAccount: false,
      type: "",
    };

    if (requestType === "CREATOR_TYPE") {
      role = {
        isBusinessAccount: true,
        type: "CREATOR",
      };
    } else if (requestType === "BUSINESS_TYPE") {
      role = {
        isBusinessAccount: true,
        type: "BUSINESS",
      };
    } else if (requestType === "BASIC_TYPE") {
      role = {
        ...role,
        type: "BASIC",
      };
    }

    const res = await editUserRole({
      userId: tokenDetails?.userId,
      role,
    });

    if (res) {
      return {
        res,
        err: null,
      };
    }
  } catch (err) {
    return {
      res: null,
      err,
    };
  }
};

export default editUserRoleService;
