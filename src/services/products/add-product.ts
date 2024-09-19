import { addProduct } from "../../database/products";
import constants from "../../helpers/constants";
import { getTokenDetails } from "../../helpers/jwt";
import { createProduct } from "../../models/product/product";
import { Product } from "../../models/product/product-types";
import { ServiceRequest, TokenDetails } from "../../utils/global-interfaces";

interface Params {
  request: ServiceRequest;
  accessToken: string;
}

const addProductService = async ({ request, accessToken }: Params) => {
  try {
    const tokenDetails = (await getTokenDetails(accessToken)) as TokenDetails;
    if (!tokenDetails) throw new Error("Error in decoding accessToken");

    const payload = {
      ...request,
      owner: {
        userId: tokenDetails.userId,
      },
      createdAt: new Date(),
    } as Product;
    const postData = await addProduct(createProduct(payload));
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

export default addProductService;
