import { ObjectId } from "mongodb";
import mongoClientPromise from "@/app/api/services/mongodb";
import User from "@/app/lib/models/User";

export class UserService {
  static async getById(userId) {
    const client = await mongoClientPromise;
    const db = client.db();
    const users = db.collection("users");

    const user = await users.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      throw new Error("User not found");
    }

    return new User({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  }

  static async findByEmail(email) {
    const client = await mongoClientPromise;
    const db = client.db();
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    return new User({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  }

  static async create({ name, email }) {
    const client = await mongoClientPromise;
    const db = client.db();
    const users = db.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const user = {
      name,
      email,
      createdAt: new Date(),
    };

    const result = await users.insertOne(user);

    return new User({
      id: result.insertedId.toString(),
      name: user.name,
      email: user.email,
    });
  }
}

export default UserService;
