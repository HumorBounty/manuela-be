import { ObjectId } from "mongodb";
import makeDb from ".";

const database = makeDb();

async function addAuditLogQuery(payload: any) {
  const db = await database;
  const result = await db.collection("audit_log").insertOne(payload);
  return {
    success: result.acknowledged ? true : false,
    insertedId: result.insertedId,
  };
}

async function editAuditLogQuery({ userId, payload }: any) {
  const db = await database;
  const result = await db.collection("audit_log").updateOne(
    {
      userId: new ObjectId(userId),
    },
    {
      [payload.field === "feedback" ? "$set" : "$inc"]: {
        [payload.field]:
          payload.field === "feedback" ? payload.feedbackItems : 1,
      },
    }
  );
  return result;
}

export { addAuditLogQuery, editAuditLogQuery };
