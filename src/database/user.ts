import { ObjectId } from "mongodb";
import makeDb from "./index";

const database = makeDb();

export const saveUser = async (user: any) => {
  const db = await database;
  const role = await db.collection("role").findOne({ name: "user" });
  let userExist;

  if (user._id) {
    userExist = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user._id) });
  }

  let result;

  if (!userExist) {
    result = await db
      .collection("users")
      .insertOne({ role: role?.name, ...user });
  } else {
    result = {
      acknowledged: true,
      insertedId: userExist._id,
    };
  }

  return {
    success: !!result.acknowledged,
    insertedId: result.insertedId,
  };
};

export const getUsersList = async () => {
  const db = await database;
  const query = {};
  const result = await db.collection("users").find(query).toArray();
  return result;
};

export const getUserQuery = async (userId: string) => {
  const db = await database;
  return await db.collection("users").findOne({ _id: new ObjectId(userId) });
};

export const editUsername = async ({ userId, username }: any) => {
  const db = await database;
  const result = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(userId) }, { $set: { username } });
  return result;
};


export const getUserByEmailQuery = async (email: string) => {
  const db = await database;
  return await db.collection("users").findOne({
    email: email,
  });
};

export const insertUserProfile = async (data: any) => {
  const db = await database;
  const result = await db
    .collection("users")
    .updateOne(
      { _id: new ObjectId(data.userId) },
      { $set: { profileId: data.profileId } }
    );
  return result;
};

export const storeTokenQuery = async ({ ...data }) => {
  const db = await database;
  const result = await db.collection("access_tokens").insertOne({
    userId: new ObjectId(data.userId),
    ...data,
  });

  return {
    success: !!result.acknowledged,
    insertedId: result.insertedId,
  };
};

export const removeTokenQuery = async (data: any) => {
  const db = await database;
  const result = await db.collection("access_tokens").deleteOne({
    userId: new ObjectId(data.userId),
  });
  return result;
};

export const getTokenQuery = async (userId: string) => {
  const db = await database;
  const result = await db.collection("access_tokens").findOne({
    userId: new ObjectId(userId),
  });
  return result;
};
