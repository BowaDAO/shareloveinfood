import mongoose from "mongoose";

const URI = process.env.MONGODB_URI as string;

export const connectDatabase = async () => {
  try {
    await mongoose.connect(URI, {
      dbName: "shareloveinfood",
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
