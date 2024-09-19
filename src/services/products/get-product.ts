import { getProduct } from "../../database/products";

const getProductService = async (productId: string) => {
  try {
    const res = await getProduct(productId);
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

export default getProductService;
