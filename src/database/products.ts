import { ObjectId } from "mongodb";
import makeDb from ".";
import { Product } from "../models/product/product-types";
const database = makeDb();

export const addProduct = async (product: Product) => {
  const db = await database;
  const result = await db.collection("products").insertOne(product);

  return {
    success: !!result.acknowledged,
    insertedId: result.insertedId,
  };
};

export const getProduct = async (postId: string = "") => {
  const db = await database;
  const query = { _id: new ObjectId(postId) };
  const result = await db.collection("products").findOne(query);
  return result;
};

export const getProductsList = async (userId: string) => {
  const db = await database;
  const query = { "owner.userId": userId };
  const result = await db
    .collection("products")
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
  return result;
};
