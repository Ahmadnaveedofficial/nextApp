import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
  // Reuse existing connection
  if (connection.isConnected) {
    console.log(" Database already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string);

    connection.isConnected = db.connections[0].readyState;

    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error: unknown) {
    console.error("MongoDB Connection Failed");

    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    throw new Error("Unknown database connection error");
  }
};

export default dbConnect;
