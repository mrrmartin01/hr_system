import mongoose from "mongoose";

const connection = {};

async function connectMongo() {
  if (connection.isConnected) {
    console.log("Using existing MongoDB connection");
    return mongoose;
  }

  try {
    if (!global._mongooseClient) {
      global._mongooseClient = mongoose.connect(process.env.MONGO_URI); // No need for deprecated options
    }

    const db = await global._mongooseClient;
    connection.isConnected = db.connections[0].readyState;
    console.log("New MongoDB connection established:", connection.isConnected);

    return mongoose;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("MongoDB connection failed");
  }
}

const clientPromise = connectMongo(); // Client promise for reuse

export default clientPromise;
