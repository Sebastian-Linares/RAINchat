import { apiService } from "../services/api";

class Conversation {
  constructor({ id, userId, startAt, duration, agentId, createdAt }) {
    this.id = id;
    this.userId = userId;
    this.startAt = startAt;
    this.duration = duration;
    this.agentId = agentId;
    this.createdAt = createdAt;
  }

  // Method to create a new conversation instance and save it to the database
  static async create({ userId, agentId }) {
    if (!userId || !agentId) {
      throw new Error("User ID and Agent ID are required");
    }

    const now = new Date();
    const conversationData = {
      userId,
      agentId,
      startAt: now,
      duration: 0,
      createdAt: now,
    };

    // Create conversation in the database
    const response = await apiService.post("/conversations", conversationData);
    return new Conversation(response);
  }

  static fromJson(json) {
    return new Conversation(json);
  }

  async addDuration(time) {
    const newDuration = this.duration + time;
    const response = await apiService.put(`/conversations/${this.id}`, {
      duration: newDuration,
    });

    if (!response.duration) {
      throw new Error("Failed to update conversation duration");
    }

    this.duration = newDuration;

    return this;
  }

  toJson() {
    return {
      id: this.id,
      userId: this.userId,
      startAt: this.startAt,
      duration: this.duration,
      agentId: this.agentId,
      createdAt: this.createdAt,
    };
  }
}

export default Conversation;
