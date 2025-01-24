import { NextResponse } from "next/server";
import ConversationsService from "@/app/services/conversationsService";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { duration } = await request.json();

    if (duration === undefined) {
      return NextResponse.json(
        { message: "Duration is required" },
        { status: 400 }
      );
    }

    await ConversationsService.updateDuration(id, duration);
    return NextResponse.json({ duration });
  } catch (error) {
    console.error("Error updating conversation:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
