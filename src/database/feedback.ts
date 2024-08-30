import makeDb from ".";
import { Feedback } from "../models/feedback/feedback-interfaces";
const database = makeDb();

/**
 * @param {feedback} feedback
 * @returns {{ success: boolean, insertedId: string }}
 */
export const addFeedback = async (feedback: any) => {
  const db = await database;
  const result = await db.collection("feedback").insertOne(feedback);

  return {
    success: !!result.acknowledged,
    insertedId: result.insertedId,
  };
};

/**
 * @returns { result } - feedback list data
 */
export const getFeedbackList = async () => {
  const db = await database;
  const query = {};
  const result = await db.collection("feedback").find(query).toArray();
  return result;
};
