import { NextResponse } from "next/server";
import ConversationsService from "@/app/api/services/conversationsService";

export async function POST(request) {
  try {
    const { userId, agentId, startAt, duration, createdAt } =
      await request.json();

    // Validate required fields
    if (!userId || !agentId) {
      return NextResponse.json(
        { message: "User ID and Agent ID are required" },
        { status: 400 }
      );
    }

    // Create conversation using the service
    const conversation = await ConversationsService.create({
      userId,
      agentId,
      startAt,
      duration,
      createdAt,
    });

    // Return the created conversation
    return NextResponse.json(conversation.toJson());
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
