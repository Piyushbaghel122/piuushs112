import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/auth";

    await mongoose.connect(mongoUri);
    console.log("Connected to database");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error";
    console.error("Database connection failed:", message);
    process.exit(1);
  }
}
