import { Product } from "./product-types";

export const createProduct = (payload: Product) => {
  const { name, description, brand, price, link, variants, owner, createdAt } =
    payload;

  // Validate required fields
  if (!name) {
    throw new Error("name is required.");
  }

  if (!price) {
    throw new Error("price is required.");
  }

  if (!link) {
    throw new Error("link is required.");
  }

  if (!owner) {
    throw new Error("owner is required.");
  }

  if (!createdAt) {
    throw new Error("createdAt is required.");
  }

  return {
    name,
    description,
    brand,
    price,
    link,
    variants,
    owner,
    createdAt,
  };
};
