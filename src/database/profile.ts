import { ObjectId } from "mongodb";
import makeDb from "./index";

const database = makeDb();

export const listProfileQuery = async () => {
  const db = await database;
  const result = await db.collection("profiles").find({}).toArray();
  return result;
};

export const removeProfileQuery = async ({
  profileId,
}: {
  profileId: string;
}) => {
  const db = await database;
  const result = await db
    .collection("profiles")
    .deleteOne({ _id: new ObjectId(profileId) });
  return result;
};

export const getProfileQuery = async ({
  userId,
  profileId,
}: {
  userId?: string;
  profileId?: string;
}) => {
  const db = await database;
  const query = userId
    ? {
        userId: new ObjectId(userId),
      }
    : profileId
    ? { _id: new ObjectId(profileId) }
    : null;

  if (!query) throw new Error("Both userId and profileId are missing.");

  const result = await db.collection("profiles").findOne(query);
  return result;
};

export const getProfileByUserQuery = async (userId: string) => {
  const db = await database;
  const result = await db
    .collection("profiles")
    .findOne({ userId: new ObjectId(userId) });
  return result;
};

export const getProfileByEmail = async (email: string) => {
  const db = await database;
  return await db.collection("profiles").findOne({
    email,
  });
};

export const addProfile = async ({ profileId, ...profile }: any) => {
  const db = await database;
  if (profileId) {
    profile._id = new ObjectId(profileId);
  }
  const result = await db.collection("profiles").insertOne(profile);

  return {
    success: !!result.acknowledged,
    insertedId: result.insertedId,
  };
};

 export const editProfileDetails = async ({ userId, payload }: any) => {
  const db = await database;
  const result = await db
    .collection("profiles")
    .updateOne({ userId: new ObjectId(userId) }, { $set: 
      { 
        bio: payload.bio,
        gender: payload.gender
      } 
    });
  return result;
};

export const editProfileImage = async ({ userId, profileImage }: any) => {
  const db = await database;
  const result = await db
    .collection("profiles")
    .updateOne({ userId: new ObjectId(userId) }, { $set: { profileImage } });
  return result;
};
