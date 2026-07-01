import mongoose from "mongoose";

// Store the current database connection state
type ConnectionObject = {
  isConnected?: number;
};

// Global connection object to prevent multiple connections
const connection: ConnectionObject = {};

const dbConnect = async (): Promise<void> => {
  // Reuse the existing connection if already connected
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    // Connect to MongoDB using the connection string
    const db = await mongoose.connect(process.env.MONGODB_URI as string);

    // Save the connection state
    connection.isConnected = db.connections[0].readyState;

    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error: unknown) {
    console.error("MongoDB Connection Failed");

    // Throw the original error message if available
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    }

    // Handle unknown errors
    throw new Error("Unknown database connection error");
  }
};

export default dbConnect;