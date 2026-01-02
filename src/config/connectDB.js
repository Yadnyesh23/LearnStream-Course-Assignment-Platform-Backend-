import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `Databse connected successfully \n DB Host : ${conn.connection.host} \n DB Name : ${conn.connection.name}`
    );
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    throw new ApiError(500, "Database connection error : ", error.message);
  }
};

export default connectDB;
