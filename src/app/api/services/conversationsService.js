import { ObjectId } from "mongodb";

import mongoClientPromise from "@/app/api/services/mongodb";
import Conversation from "@/app/lib/models/Conversation";
import UserService from "@/app/api/services/userService";

export class ConversationsService {
  static async create({ userId, agentId, startAt, duration, createdAt }) {
    const client = await mongoClientPromise;
    const db = client.db();
    const conversations = db.collection("conversations");

    let totalDurationThisMonth =
      await ConversationsService.getUserMonthlyDuration(userId);

    // If total duration is greater than 20 hours, throw an error
    if (totalDurationThisMonth > 20 /** 60 * 60 * 1000*/) {
      throw new Error("User has exceeded the maximum duration for this month");
    }

    const conversation = {
      userId: userId,
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

  static async getUserMonthlyDuration(userId) {
    const client = await mongoClientPromise;
    const db = client.db();
    const conversations = db.collection("conversations");

    let totalDurationThisMonth = await conversations
      .aggregate([
        {
          $match: {
            // userId: new ObjectId(userId),
            createdAt: {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            },
          },
        },
        {
          $group: {
            _id: "$userId",
            totalDuration: { $sum: "$duration" },
          },
        },
      ])
      .toArray();

    totalDurationThisMonth = totalDurationThisMonth[0]?.totalDuration || 0;

    return totalDurationThisMonth;
  }
}

export default ConversationsService;
