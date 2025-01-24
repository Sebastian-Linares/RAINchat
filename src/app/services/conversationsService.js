import mongoClientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";
import Conversation from "../models/Conversation";

export class ConversationsService {
  static async create({ userId, agentId, startAt, duration, createdAt }) {
    const client = await mongoClientPromise;
    const db = client.db();
    const conversations = db.collection("conversations");

    const conversation = {
      userId: new ObjectId(userId),
      agentId,
      startAt: new Date(startAt),
      duration,
      createdAt: new Date(createdAt),
    };

    const result = await conversations.insertOne(conversation);

    return new Conversation({
      id: result.insertedId.toString(),
      ...conversation,
      userId: userId, // Convert back to string for the model
      startAt: conversation.startAt,
      createdAt: conversation.createdAt,
    });
  }

  static async updateDuration(conversationId, duration) {
    const client = await mongoClientPromise;
    const db = client.db();
    const conversations = db.collection("conversations");

    await conversations.updateOne(
      { _id: new ObjectId(conversationId) },
      { $set: { duration } }
    );

    return duration;
  }
}

export default ConversationsService;
