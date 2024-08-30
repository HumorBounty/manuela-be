import { ObjectId } from "mongodb";
import makeDb from ".";
import { Post } from "../models/post/post-types";
const database = makeDb();

export const addPost = async (post: Post) => {
  const db = await database;
  const result = await db.collection("posts").insertOne(post);

  return {
    success: !!result.acknowledged,
    insertedId: result.insertedId,
  };
};

export const getPost = async (postId: string = "") => {
  const db = await database;
  const query = { _id: new ObjectId(postId) };
  const result = await db.collection("posts").findOne(query);
  return result;
};

export const getPostList = async (userId: string) => {
  const db = await database;
  const query = { "owner.userId": userId };
  const result = await db.collection("posts").find(query).sort({ createdAt: -1 }).toArray();
  return result;
};