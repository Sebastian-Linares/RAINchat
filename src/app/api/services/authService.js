import mongoClientPromise from "@/app/api/services/mongodb";
import User from "@/app/lib/models/User";

export class AuthService {
  static async login(email) {
    const client = await mongoClientPromise;
    const db = client.db();

    // Find user by email
    const userDoc = await db.collection("users").findOne({ email });

    if (!userDoc) {
      throw new Error("User not found");
    }

    // Create user instance
    const user = new User({
      id: userDoc._id,
      name: userDoc.name,
      email: userDoc.email,
    });

    return {
      user,
    };
  }
}

export default AuthService;
