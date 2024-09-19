import { getProductsList } from "../../database/products";
import { getTokenDetails } from "../../helpers/jwt";
import { TokenDetails } from "../../utils/global-interfaces";

const getProductsListService = async (accessToken: string) => {
  try {
    const tokenDetails = (await getTokenDetails(accessToken)) as TokenDetails;
    if (!tokenDetails) throw new Error("Unauthorized");

    const res = await getProductsList(tokenDetails.userId);
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

export default getProductsListService;
